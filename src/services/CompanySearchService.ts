
import { supabase } from "@/integrations/supabase/client";

export interface CompanySearchParams {
  keywords: string[];
  location?: string;
}

export interface Company {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  description?: string;
}

export interface SearchHistoryItem {
  id: string;
  keywords: string[];
  location?: string;
  results_count: number;
  created_at: string;
}

export const CompanySearchService = {
  /**
   * Search for companies using Google Maps API through Supabase edge function
   */
  async searchCompanies(params: CompanySearchParams): Promise<Company[]> {
    try {
      const { keywords, location } = params;
      
      const { data, error } = await supabase.functions.invoke('search-companies', {
        body: { keywords, location }
      });
      
      if (error) throw new Error(error.message);
      
      return data || [];
    } catch (error) {
      console.error("Error searching companies:", error);
      throw error;
    }
  },
  
  /**
   * Get saved companies from the database
   */
  async getSavedCompanies(limit: number = 50): Promise<Company[]> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
        
      if (error) throw error;
      
      return data as Company[];
    } catch (error) {
      console.error("Error getting saved companies:", error);
      return [];
    }
  },
  
  /**
   * Get user's search history
   */
  async getSearchHistory(): Promise<SearchHistoryItem[]> {
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return data as SearchHistoryItem[];
    } catch (error) {
      console.error("Error getting search history:", error);
      return [];
    }
  }
};
