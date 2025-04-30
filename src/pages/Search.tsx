
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import SearchResults from "@/components/search/SearchResults";
import FieldsSelector from "@/components/search/FieldsSelector";
import AIGeneratedCombinations from "@/components/search/AIGeneratedCombinations";
import LocationSelector from "@/components/search/LocationSelector";
import { useToast } from "@/hooks/use-toast";
import { Check, CheckCheck, ChevronRight, Search as SearchIcon, Brain } from "lucide-react";

const Search = () => {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<string>("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = useState<string[]>(["api"]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showAICombinations, setShowAICombinations] = useState<boolean>(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const [aiCommand, setAiCommand] = useState<string>("generate keywords related to {input} for business search");
  const [showAiCommandEdit, setShowAiCommandEdit] = useState<boolean>(false);
  
  // 基础建议的关键词
  const baseSuggestedKeywords = ["软件开发", "数据分析", "市场营销", "电子商务", "咨询服务", "人工智能", "云服务", "大数据", "区块链", "物联网"];
  
  // 监听输入变化生成动态建议
  useEffect(() => {
    if (keywords.length > 0) {
      // 过滤出与当前输入匹配的关键词
      const filtered = baseSuggestedKeywords.filter(
        keyword => keyword.includes(keywords) && !selectedKeywords.includes(keyword)
      );
      // 从过滤结果中随机选择3-5个作为建议
      const count = Math.min(Math.floor(Math.random() * 3) + 3, filtered.length);
      const suggestions = filtered.slice(0, count);
      setDynamicSuggestions(suggestions);
    } else {
      setDynamicSuggestions([]);
    }
  }, [keywords, selectedKeywords]);
  
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
      const newKeywords = ["企业服务", "客户管理", "数据服务", "云计算解决方案", "SaaS平台"];
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
    
    if (selectedMethods.length === 0) {
      toast({
        title: "无法开始搜索",
        description: "请至少选择一种抓取方法",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    setProgress(0);
    
    toast({
      title: "正在搜索",
      description: `使用 ${selectedMethods.map(m => m.toUpperCase()).join(", ")} 方法开始抓取客户信息`
    });
    
    // 模拟搜索过程和进度
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSearching(false);
          setShowResults(true);
          toast({
            title: "搜索完成",
            description: "已抓取到客户信息，请查看结果",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };
  
  const toggleAICombinations = () => {
    setShowAICombinations(!showAICombinations);
    
    if (!showAICombinations) {
      toast({
        title: "AI组合生成器已启用",
        description: "您可以使用AI自动生成关键词与地区的所有组合"
      });
    }
  };
  
  const toggleMethodSelection = (method: string) => {
    if (selectedMethods.includes(method)) {
      if (selectedMethods.length > 1) {
        setSelectedMethods(selectedMethods.filter(m => m !== method));
      }
    } else {
      setSelectedMethods([...selectedMethods, method]);
    }
  };
  
  const handleSelectAllMethods = () => {
    if (selectedMethods.length === 3) {
      setSelectedMethods(["api"]); // 至少保留一个方法
    } else {
      setSelectedMethods(["api", "ai", "mcp"]);
    }
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
                  
                  {/* 动态推荐关键词 - 只在输入时显示 */}
                  {dynamicSuggestions.length > 0 && (
                    <div className="mt-2 mb-3">
                      <Label className="text-sm text-muted-foreground">动态推荐关键词</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {dynamicSuggestions.map((keyword) => (
                          <Badge 
                            key={`dyn-${keyword}`} 
                            variant="outline" 
                            className="cursor-pointer bg-muted/50 hover:bg-muted"
                            onClick={() => {
                              setSelectedKeywords([...selectedKeywords, keyword]);
                              setDynamicSuggestions(
                                dynamicSuggestions.filter(k => k !== keyword)
                              );
                            }}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* AI 生成关键词按钮和命令编辑 */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowAiCommandEdit(!showAiCommandEdit)}
                      className="flex items-center gap-1"
                    >
                      <Brain className="h-4 w-4" />
                      AI生成关键词
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleAICombinations}
                    >
                      {showAICombinations ? "隐藏AI组合生成器" : "显示AI组合生成器"}
                    </Button>
                  </div>
                  
                  {showAiCommandEdit && (
                    <div className="mt-2 p-3 border rounded-md bg-muted/20">
                      <Label htmlFor="ai-command" className="text-sm">AI 命令编辑</Label>
                      <Input
                        id="ai-command"
                        value={aiCommand}
                        onChange={(e) => setAiCommand(e.target.value)}
                        className="mt-1 mb-2"
                        placeholder="输入AI命令"
                      />
                      <div className="flex justify-between">
                        <Select defaultValue="gpt4">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="选择AI模型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt4">GPT-4</SelectItem>
                            <SelectItem value="gpt4o">GPT-4o</SelectItem>
                            <SelectItem value="claude">Claude</SelectItem>
                            <SelectItem value="gemini">Gemini</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" onClick={handleGenerateKeywords}>生成关键词</Button>
                      </div>
                    </div>
                  )}
                  
                  {/* 常规推荐关键词 */}
                  <div className="mt-3">
                    <Label className="text-sm text-muted-foreground">推荐关键词</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {baseSuggestedKeywords.slice(0, 5).map((keyword) => (
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
                
                {showAICombinations && (
                  <div className="mt-4">
                    <AIGeneratedCombinations />
                  </div>
                )}
                
                <Separator />
                
                <LocationSelector />
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
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">选择抓取方法（可多选）</Label>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-2">
                      {[
                        { id: "api", label: "API" },
                        { id: "ai", label: "AI工具" },
                        { id: "mcp", label: "MCP服务" }
                      ].map(method => (
                        <Button
                          key={method.id}
                          variant={selectedMethods.includes(method.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleMethodSelection(method.id)}
                          className={selectedMethods.includes(method.id) ? "border-primary" : ""}
                        >
                          {method.label}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleSelectAllMethods}
                    >
                      {selectedMethods.length === 3 ? "取消全选" : "全选"}
                    </Button>
                  </div>
                </div>

                <Tabs
                  value={selectedMethods.length === 1 ? selectedMethods[0] : "multi"}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="api" disabled={!selectedMethods.includes("api")}>API</TabsTrigger>
                    <TabsTrigger value="ai" disabled={!selectedMethods.includes("ai")}>AI工具</TabsTrigger>
                    <TabsTrigger value="mcp" disabled={!selectedMethods.includes("mcp")}>MCP服务</TabsTrigger>
                    <TabsTrigger value="multi" disabled={selectedMethods.length <= 1}>多模式</TabsTrigger>
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
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="ai-prompt">AI提示词</Label>
                        <Button size="sm" variant="ghost">编辑</Button>
                      </div>
                      <Input
                        id="ai-prompt"
                        className="font-mono text-sm"
                        defaultValue="搜索{keyword}在{location}地区的公司信息，包括联系方式和网址"
                      />
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
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="mcp-command">MCP命令</Label>
                        <Button size="sm" variant="ghost">编辑</Button>
                      </div>
                      <Input
                        id="mcp-command"
                        className="font-mono text-sm"
                        defaultValue="search companies with {keyword} in {location} with contact details"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mcp-enhanced" />
                      <Label htmlFor="mcp-enhanced">启用增强功能</Label>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="multi" className="space-y-4">
                    <div className="p-3 bg-muted/30 rounded-md">
                      <h4 className="font-medium mb-2">已选择 {selectedMethods.length} 种搜索方法</h4>
                      <div className="space-y-2">
                        {selectedMethods.includes("api") && (
                          <div className="flex items-center">
                            <Badge className="bg-blue-100 text-blue-600 mr-2">API</Badge>
                            <span className="text-sm">Google Maps API</span>
                          </div>
                        )}
                        {selectedMethods.includes("ai") && (
                          <div className="flex items-center">
                            <Badge className="bg-green-100 text-green-600 mr-2">AI</Badge>
                            <span className="text-sm">N8N + GPT-4</span>
                          </div>
                        )}
                        {selectedMethods.includes("mcp") && (
                          <div className="flex items-center">
                            <Badge className="bg-purple-100 text-purple-600 mr-2">MCP</Badge>
                            <span className="text-sm">Claude 标准协议</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        同时使用多种方法将合并来自不同来源的结果
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="multi-deduplicate" defaultChecked />
                      <Label htmlFor="multi-deduplicate">去除重复结果</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="multi-parallel" defaultChecked />
                      <Label htmlFor="multi-parallel">并行执行</Label>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {isSearching && (
                <div className="mt-6">
                  <Label className="text-sm">抓取进度</Label>
                  <Progress value={progress} className="mt-2" />
                  <p className="text-center text-sm text-muted-foreground mt-2">{progress}%</p>
                </div>
              )}
              
              <Button 
                className="w-full mt-6" 
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? "搜索中..." : "开始搜索"}
              </Button>
              
              {showResults && (
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => window.location.href = "/results"}
                >
                  查看搜索结果
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {showResults && <SearchResults />}
    </div>
  );
};

export default Search;
