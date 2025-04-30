
import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// 示例地区数据
const countries = ["中国", "美国", "加拿大", "澳大利亚", "英国", "德国", "法国", "日本"];
const provinces = {
  "中国": ["北京", "上海", "广东", "江苏", "浙江", "四川", "湖北"],
  "美国": ["加利福尼亚", "纽约", "德克萨斯", "佛罗里达", "伊利诺伊"]
};
const cities = {
  "广东": ["广州", "深圳", "东莞", "佛山", "珠海"],
  "浙江": ["杭州", "宁波", "温州", "嘉兴", "湖州"],
  "加利福尼亚": ["洛杉矶", "旧金山", "圣地亚哥", "圣何塞", "长滩"]
};

const LocationSelector = () => {
  const { toast } = useToast();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [bulkLocations, setBulkLocations] = useState<string>("");
  
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSelectedProvinces([]);
    setSelectedCities([]);
  };
  
  const handleProvinceSelect = (province: string) => {
    if (selectedProvinces.includes(province)) {
      setSelectedProvinces(selectedProvinces.filter(p => p !== province));
      // 移除与该省相关的城市
      const provinceCities = cities[province as keyof typeof cities] || [];
      setSelectedCities(selectedCities.filter(city => !provinceCities.includes(city)));
    } else {
      setSelectedProvinces([...selectedProvinces, province]);
    }
  };
  
  const handleCitySelect = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };
  
  const handleSelectAllProvinces = () => {
    const availableProvinces = selectedCountry ? provinces[selectedCountry as keyof typeof provinces] || [] : [];
    if (selectedProvinces.length === availableProvinces.length) {
      // 如果全选了，则取消全选
      setSelectedProvinces([]);
      setSelectedCities([]);
    } else {
      // 否则全选
      setSelectedProvinces([...availableProvinces]);
    }
  };
  
  const handleSelectAllCities = (province: string) => {
    const provinceCities = cities[province as keyof typeof cities] || [];
    
    // 检查这个省的城市是否已经全部选中
    const allSelected = provinceCities.every(city => selectedCities.includes(city));
    
    if (allSelected) {
      // 如果全部选中，则取消全部
      setSelectedCities(selectedCities.filter(city => !provinceCities.includes(city)));
    } else {
      // 否则全选
      const newSelectedCities = [...selectedCities];
      provinceCities.forEach(city => {
        if (!newSelectedCities.includes(city)) {
          newSelectedCities.push(city);
        }
      });
      setSelectedCities(newSelectedCities);
    }
  };
  
  const handleBulkImport = () => {
    if (!bulkLocations.trim()) {
      toast({
        title: "无法导入",
        description: "请输入位置信息",
        variant: "destructive"
      });
      return;
    }
    
    // 简单解析，以逗号分隔
    const locations = bulkLocations.split(/[,，\n]/);
    
    // 这里简单处理，实际应用中需要更复杂的数据处理
    const newCities = locations.map(loc => loc.trim()).filter(loc => loc !== "");
    
    if (newCities.length > 0) {
      setSelectedCities([...new Set([...selectedCities, ...newCities])]);
      setBulkLocations("");
      
      toast({
        title: "批量导入成功",
        description: `已导入 ${newCities.length} 个位置信息`
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">地区选择</h3>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">批量导入位置</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>批量导入位置信息</DialogTitle>
              <DialogDescription>
                请输入位置信息，每行一个或用逗号分隔
              </DialogDescription>
            </DialogHeader>
            <Textarea 
              value={bulkLocations}
              onChange={(e) => setBulkLocations(e.target.value)}
              placeholder="例如: 北京, 上海, 广州&#10;深圳, 杭州"
              className="min-h-[150px]"
            />
            <DialogFooter>
              <Button type="submit" onClick={handleBulkImport}>导入</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="select">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="select">选择地区</TabsTrigger>
          <TabsTrigger value="selected">已选地区</TabsTrigger>
        </TabsList>
        
        <TabsContent value="select" className="space-y-4 pt-4">
          <div>
            <Label htmlFor="country">国家</Label>
            <Select onValueChange={handleCountrySelect}>
              <SelectTrigger id="country">
                <SelectValue placeholder="选择国家" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedCountry && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label>省份/州</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSelectAllProvinces}
                  className="h-6 text-xs"
                >
                  {selectedProvinces.length === (provinces[selectedCountry as keyof typeof provinces] || []).length
                    ? "取消全选" : "全选"}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {provinces[selectedCountry as keyof typeof provinces]?.map((province) => (
                  <div key={province} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`province-${province}`}
                      checked={selectedProvinces.includes(province)}
                      onCheckedChange={() => handleProvinceSelect(province)}
                    />
                    <Label 
                      htmlFor={`province-${province}`} 
                      className="cursor-pointer text-sm"
                    >
                      {province}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedProvinces.length > 0 && (
            <div>
              <Label>城市</Label>
              
              {selectedProvinces.map((province) => (
                <div key={province} className="mt-3 border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{province}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleSelectAllCities(province)}
                      className="h-6 text-xs"
                    >
                      {cities[province as keyof typeof cities]?.every(city => selectedCities.includes(city))
                        ? "取消全选" : "全选"}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {cities[province as keyof typeof cities]?.map((city) => (
                      <div key={city} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`city-${city}`}
                          checked={selectedCities.includes(city)}
                          onCheckedChange={() => handleCitySelect(city)}
                        />
                        <Label 
                          htmlFor={`city-${city}`} 
                          className="cursor-pointer text-sm"
                        >
                          {city}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="selected">
          <div className="rounded-md border p-4">
            {selectedCountry && (
              <div className="mb-2">
                <span className="text-sm font-medium">国家:</span>
                <Badge variant="outline" className="ml-2">{selectedCountry}</Badge>
              </div>
            )}
            
            {selectedProvinces.length > 0 && (
              <div className="mb-2">
                <span className="text-sm font-medium">省份/州:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedProvinces.map(province => (
                    <Badge key={province} variant="secondary">
                      {province}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {selectedCities.length > 0 && (
              <div>
                <span className="text-sm font-medium">城市:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCities.map(city => (
                    <Badge key={city} variant="outline">
                      {city}
                      <button 
                        className="ml-1 text-muted-foreground hover:text-destructive"
                        onClick={() => setSelectedCities(selectedCities.filter(c => c !== city))}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {(!selectedCountry && selectedCities.length === 0) && (
              <p className="text-muted-foreground text-center py-6">暂无选择的地区</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationSelector;
