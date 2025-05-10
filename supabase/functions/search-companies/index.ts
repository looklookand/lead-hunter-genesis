
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SearchRequest {
  keywords: string[];
  location: string;
}

interface Company {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  email?: string;
  description?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY");
    if (!GOOGLE_API_KEY) {
      throw new Error("Google Maps API key not found");
    }

    // Parse request body
    const { keywords, location }: SearchRequest = await req.json();
    
    if (!keywords || keywords.length === 0) {
      throw new Error("Keywords are required");
    }

    console.log(`Searching with keywords: ${keywords.join(", ")} in location: ${location || "worldwide"}`);
    
    // Combine keywords for search query
    const searchQuery = keywords.join(" ");
    
    // Prepare Google Places API URL for text search
    let apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}`;
    
    // Add location if provided
    if (location && location.trim() !== "") {
      apiUrl += `+in+${encodeURIComponent(location)}`;
    }
    
    // Add API key
    apiUrl += `&key=${GOOGLE_API_KEY}`;

    // Call Google Places API
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (!data.results) {
      throw new Error("No results from Google API");
    }
    
    // Create a Supabase client for storing results
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    const companies: Company[] = [];
    
    // Process and transform results
    for (const place of data.results.slice(0, 20)) { // Limit to 20 places
      try {
        // Get place details with additional info (optional)
        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website,types&key=${GOOGLE_API_KEY}`
        );
        const details = await detailsResponse.json();
        const detailsResult = details.result || {};
        
        // Create company object
        const company: Company = {
          name: place.name,
          address: place.formatted_address || detailsResult.formatted_address,
          phone: detailsResult.formatted_phone_number || null,
          website: detailsResult.website || null,
          description: place.types ? place.types.join(", ") : null,
        };
        
        // Attempt to guess/extract email (simplified approach)
        if (company.website) {
          company.email = `contact@${company.website.replace(/^https?:\/\//i, "").replace(/^www\./i, "")}`;
        }
        
        companies.push(company);
        
        // Store in Supabase
        await supabaseClient.from("companies").insert({
          name: company.name,
          address: company.address,
          phone: company.phone,
          website: company.website,
          email: company.email,
          description: company.description,
          keywords: keywords,
        });
      } catch (error) {
        console.error("Error processing place:", error);
        // Continue with next place
      }
    }
    
    // Store search history
    try {
      const authHeader = req.headers.get("authorization");
      let userId = null;
      
      if (authHeader) {
        // Extract user ID from JWT if available
        const token = authHeader.replace("Bearer ", "");
        const { data: userData } = await supabaseClient.auth.getUser(token);
        userId = userData?.user?.id;
      }
      
      if (userId) {
        await supabaseClient.from("search_history").insert({
          keywords: keywords,
          location: location,
          results_count: companies.length,
          user_id: userId,
        });
      }
    } catch (error) {
      console.error("Error storing search history:", error);
      // Continue execution even if search history storage fails
    }
    
    return new Response(JSON.stringify(companies), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
