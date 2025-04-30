
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SearchResults from "@/components/search/SearchResults";
import FieldsSelector from "@/components/search/FieldsSelector";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<string>("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("api");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // 示例建议的关键词
  const suggestedKeywords = ["软件开发", "数据分析", "市场营销", "电子商务", "咨询服务"];
  
  // 示例地区数据
  const countries = ["中国", "美国", "加拿大", "澳大利亚", "英国", "德国", "法国", "日本"];
  const provinces = ["北京", "上海", "广东", "江苏", "浙江", "四川", "湖北"];
  const cities = ["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉"];
  
  const handleAddKeyword = () => {
    if (keywords && !selectedKeywords.includes(keywords)) {
      setSelectedKeywords([...selectedKeywords, keywords]);
      setKeywords("");
    }
  };
  
  const handleRemoveKeyword = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  };
  
  const handleGenerateKeywords = () => {
    toast({
      title: "AI正在生成关键词",
      description: "请稍等，正在基于您的搜索内容生成相关关键词"
    });
    
    // 模拟生成关键词
    setTimeout(() => {
      const newKeywords = ["企业服务", "客户管理", "数据服务"];
      setSelectedKeywords([...selectedKeywords, ...newKeywords]);
      
      toast({
        title: "关键词生成完成",
        description: `已生成 ${newKeywords.length} 个相关关键词`
      });
    }, 1500);
  };
  
  const handleSearch = () => {
    if (selectedKeywords.length === 0) {
      toast({
        title: "无法开始搜索",
        description: "请至少添加一个关键词",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    toast({
      title: "正在搜索",
      description: `使用 ${selectedMethod.toUpperCase()} 方法开始抓取客户信息`
    });
    
    // 模拟搜索过程
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      toast({
        title: "搜索完成",
        description: "已抓取到客户信息，请查看结果",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">关键词搜索</h1>
        <p className="text-muted-foreground">通过关键词和地区组合进行客户信息抓取</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>搜索条件</CardTitle>
              <CardDescription>设置关键词和地区筛选条件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="keywords">关键词</Label>
                  <div className="flex mt-1 mb-2">
                    <Input
                      id="keywords"
                      placeholder="输入关键词"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="flex-1 mr-2"
                    />
                    <Button onClick={handleAddKeyword}>添加</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedKeywords.map((keyword) => (
                      <Badge 
                        key={keyword} 
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {keyword}
                        <button 
                          className="ml-2 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveKeyword(keyword)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleGenerateKeywords}
                    className="mt-1"
                  >
                    AI生成关键词
                  </Button>
                  
                  <div className="mt-3">
                    <Label className="text-sm text-muted-foreground">推荐关键词</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {suggestedKeywords.map((keyword) => (
                        <Badge 
                          key={keyword} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => {
                            if (!selectedKeywords.includes(keyword)) {
                              setSelectedKeywords([...selectedKeywords, keyword]);
                            }
                          }}
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="country">国家</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择国家" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="province">省份</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择省份" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="city">城市</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择城市" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>抓取字段设置</CardTitle>
              <CardDescription>选择需要抓取的数据字段</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldsSelector />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>抓取方法</CardTitle>
              <CardDescription>选择使用的抓取方法</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="api" 
                className="w-full"
                onValueChange={(value) => setSelectedMethod(value)}
              >
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="api">API</TabsTrigger>
                  <TabsTrigger value="ai">AI工具</TabsTrigger>
                  <TabsTrigger value="mcp">MCP服务</TabsTrigger>
                </TabsList>
                
                <TabsContent value="api" className="space-y-4">
                  <div>
                    <Label htmlFor="api-source">API来源</Label>
                    <Select defaultValue="google">
                      <SelectTrigger id="api-source">
                        <SelectValue placeholder="选择API来源" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Maps API</SelectItem>
                        <SelectItem value="baidu">百度地图API</SelectItem>
                        <SelectItem value="bing">Bing搜索API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="api-cache" />
                    <Label htmlFor="api-cache">启用缓存</Label>
                  </div>
                </TabsContent>
                
                <TabsContent value="ai" className="space-y-4">
                  <div>
                    <Label htmlFor="ai-tool">AI工具</Label>
                    <Select defaultValue="n8n">
                      <SelectTrigger id="ai-tool">
                        <SelectValue placeholder="选择AI工具" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="n8n">N8N工作流</SelectItem>
                        <SelectItem value="dify">DIFY工具</SelectItem>
                        <SelectItem value="custom">自定义AI工具</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="ai-model">AI模型</Label>
                    <Select defaultValue="gpt4">
                      <SelectTrigger id="ai-model">
                        <SelectValue placeholder="选择AI模型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt4">GPT-4</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="gemini">Google Gemini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                
                <TabsContent value="mcp" className="space-y-4">
                  <div>
                    <Label htmlFor="mcp-protocol">Claude协议</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="mcp-protocol">
                        <SelectValue placeholder="选择协议版本" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">标准协议</SelectItem>
                        <SelectItem value="enhanced">增强协议</SelectItem>
                        <SelectItem value="custom">自定义协议</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mcp-enhanced" />
                    <Label htmlFor="mcp-enhanced">启用增强功能</Label>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Button 
                className="w-full mt-6" 
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? "搜索中..." : "开始搜索"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {showResults && <SearchResults />}
    </div>
  );
};

export default Search;
