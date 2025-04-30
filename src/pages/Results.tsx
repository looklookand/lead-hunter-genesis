
import React, { useState } from "react";
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Download, Filter, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 示例数据
const sampleResults = [
  {
    id: 1,
    company: "科技未来有限公司",
    website: "future-tech.com",
    address: "中国北京市海淀区中关村1号",
    phone: "+86 10 1234 5678",
    email: "contact@future-tech.com",
    contact: "张经理",
    position: "市场总监",
    wechat: "future-tech",
    linkedin: "company/future-tech",
    source: "API",
    industry: "信息技术",
    size: "100-500人"
  },
  {
    id: 2,
    company: "数据智能科技有限公司",
    website: "data-smart.cn",
    address: "中国上海市浦东新区张江高科技园区",
    phone: "+86 21 8765 4321",
    email: "info@data-smart.cn",
    contact: "李总",
    position: "CEO",
    wechat: "datasmart-tech",
    linkedin: "company/data-smart",
    source: "API",
    industry: "大数据",
    size: "50-100人"
  },
  {
    id: 3,
    company: "云创网络科技有限公司",
    website: "cloud-create.net",
    address: "中国广州市天河区珠江新城",
    phone: "+86 20 2345 6789",
    email: "support@cloud-create.net",
    contact: "王工",
    position: "技术总监",
    wechat: "cloudcreate",
    twitter: "@cloudcreate",
    source: "AI",
    industry: "云计算",
    size: "10-50人"
  },
  {
    id: 4,
    company: "智慧解决方案有限公司",
    website: "smart-solutions.org",
    address: "中国深圳市南山区科技园",
    phone: "+86 755 3456 7890",
    email: "contact@smart-solutions.org",
    contact: "陈经理",
    position: "销售总监",
    wechat: "smartsolution",
    linkedin: "company/smart-solutions",
    source: "MCP",
    industry: "人工智能",
    size: "100-500人"
  },
  {
    id: 5,
    company: "创新互联网科技有限公司",
    website: "innovative-net.com",
    address: "中国杭州市西湖区文三路",
    phone: "+86 571 4567 8901",
    email: "info@innovative-net.com",
    contact: "赵总",
    position: "运营总监",
    wechat: "innovative-tech",
    facebook: "innovativenet",
    source: "API",
    industry: "互联网",
    size: "50-100人"
  }
];

// 字段配置
const fieldOptions = [
  { id: "company", label: "公司名称", selected: true, required: true },
  { id: "website", label: "网址", selected: true },
  { id: "address", label: "地址", selected: true },
  { id: "industry", label: "行业", selected: false },
  { id: "size", label: "公司规模", selected: false },
  { id: "phone", label: "电话", selected: true },
  { id: "email", label: "邮箱", selected: true },
  { id: "contact", label: "联系人", selected: true },
  { id: "position", label: "职位", selected: true },
  { id: "wechat", label: "微信", selected: false },
  { id: "linkedin", label: "LinkedIn", selected: false },
  { id: "twitter", label: "Twitter", selected: false },
  { id: "facebook", label: "Facebook", selected: false },
  { id: "source", label: "来源", selected: true },
];

const Results = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedResults, setSelectedResults] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [filterSource, setFilterSource] = useState<string | null>(null);
  const [displayFields, setDisplayFields] = useState(fieldOptions);
  const [activeTab, setActiveTab] = useState<string>("table");
  
  // 处理全选
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedResults([]);
    } else {
      setSelectedResults(filteredResults.map(r => r.id));
    }
    setSelectAll(!selectAll);
  };
  
  // 处理单选
  const handleSelectRow = (id: number) => {
    if (selectedResults.includes(id)) {
      setSelectedResults(selectedResults.filter(r => r !== id));
      setSelectAll(false);
    } else {
      setSelectedResults([...selectedResults, id]);
      if (selectedResults.length + 1 === filteredResults.length) {
        setSelectAll(true);
      }
    }
  };
  
  // 处理字段切换
  const handleToggleField = (id: string) => {
    setDisplayFields(displayFields.map(field => 
      field.id === id && !field.required ? { ...field, selected: !field.selected } : field
    ));
  };
  
  // 处理导出
  const handleExport = (format: string) => {
    const count = selectedResults.length > 0 
      ? selectedResults.length 
      : filteredResults.length;
      
    toast({
      title: "正在导出数据",
      description: `正在将${count}条数据导出为${format.toUpperCase()}格式`
    });
  };
  
  // 筛选数据
  const filteredResults = sampleResults.filter(result => {
    const matchesSearch = searchTerm === "" || 
      result.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (result.email && result.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesFilter = filterSource === null || result.source === filterSource;
    
    return matchesSearch && matchesFilter;
  });
  
  const visibleFields = displayFields.filter(field => field.selected);

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">抓取结果</h1>
        <p className="text-muted-foreground">查看和管理抓取到的客户信息</p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>客户信息列表</CardTitle>
              <CardDescription>共 {sampleResults.length} 条数据</CardDescription>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索..."
                  className="pl-8 w-full md:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" /> 筛选
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterSource(null)}>
                    全部来源
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterSource("API")}>
                    仅API
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterSource("AI")}>
                    仅AI工具
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterSource("MCP")}>
                    仅MCP服务
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <ChevronDown className="h-4 w-4" /> 显示字段
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {displayFields.map(field => (
                    <DropdownMenuItem key={field.id} className="flex items-center gap-2" onSelect={(e) => {
                      e.preventDefault();
                      if (!field.required) handleToggleField(field.id);
                    }}>
                      <Checkbox 
                        id={`field-${field.id}`}
                        checked={field.selected}
                        disabled={field.required}
                        className="data-[disabled]:opacity-50"
                      />
                      <Label htmlFor={`field-${field.id}`} className="flex-1 cursor-pointer">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Download className="h-4 w-4" /> 导出
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport("csv")}>
                    导出为CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("excel")}>
                    导出为Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("json")}>
                    导出为JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {filterSource && (
            <div className="flex items-center mt-2">
              <span className="text-sm text-muted-foreground mr-2">筛选条件:</span>
              <Badge variant="outline" className="flex items-center gap-1">
                来源: {filterSource}
                <button 
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setFilterSource(null)}
                >
                  ×
                </button>
              </Badge>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="table" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="table">表格视图</TabsTrigger>
              <TabsTrigger value="card">卡片视图</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table">
              <div className="rounded-md border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox 
                          checked={selectAll && filteredResults.length > 0} 
                          onCheckedChange={handleSelectAll} 
                        />
                      </TableHead>
                      {displayFields.map(field => field.selected && (
                        <TableHead 
                          key={field.id}
                          className={
                            (field.id === 'address' || field.id === 'position' || field.id === 'industry' || field.id === 'size') ? 
                            "hidden md:table-cell" : ""
                          }
                        >
                          {field.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {filteredResults.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={visibleFields.length + 1} className="text-center py-10">
                          <p className="text-muted-foreground">没有找到匹配的数据</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedResults.includes(result.id)} 
                              onCheckedChange={() => handleSelectRow(result.id)} 
                            />
                          </TableCell>
                          {displayFields.map(field => field.selected && (
                            <TableCell 
                              key={field.id}
                              className={
                                (field.id === 'address' || field.id === 'position' || field.id === 'industry' || field.id === 'size') ? 
                                "hidden md:table-cell" : ""
                              }
                            >
                              {field.id === 'company' ? (
                                <span className="font-medium">{result[field.id as keyof typeof result]}</span>
                              ) : field.id === 'website' ? (
                                <a 
                                  href={`https://${result.website}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-primary hover:underline"
                                >
                                  {result.website}
                                </a>
                              ) : field.id === 'email' ? (
                                <a 
                                  href={`mailto:${result.email}`} 
                                  className="text-primary hover:underline"
                                >
                                  {result.email}
                                </a>
                              ) : field.id === 'source' ? (
                                <Badge 
                                  variant="outline" 
                                  className={
                                    result.source === "API" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                    result.source === "AI" ? "bg-green-50 text-green-600 border-green-200" :
                                    "bg-purple-50 text-purple-600 border-purple-200"
                                  }
                                >
                                  {result.source}
                                </Badge>
                              ) : (
                                result[field.id as keyof typeof result] || "-"
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="card">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResults.map(result => (
                  <Card key={result.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <Checkbox 
                            checked={selectedResults.includes(result.id)} 
                            onCheckedChange={() => handleSelectRow(result.id)}
                          />
                          <div>
                            <CardTitle className="text-lg">{result.company}</CardTitle>
                            <CardDescription>
                              <a href={`https://${result.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                {result.website}
                              </a>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            result.source === "API" ? "bg-blue-50 text-blue-600 border-blue-200" :
                            result.source === "AI" ? "bg-green-50 text-green-600 border-green-200" :
                            "bg-purple-50 text-purple-600 border-purple-200"
                          }
                        >
                          {result.source}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {result.address && displayFields.find(f => f.id === 'address')?.selected && (
                        <div className="text-sm">
                          <span className="font-medium">地址:</span> {result.address}
                        </div>
                      )}
                      {result.industry && displayFields.find(f => f.id === 'industry')?.selected && (
                        <div className="text-sm">
                          <span className="font-medium">行业:</span> {result.industry}
                        </div>
                      )}
                      {result.size && displayFields.find(f => f.id === 'size')?.selected && (
                        <div className="text-sm">
                          <span className="font-medium">规模:</span> {result.size}
                        </div>
                      )}
                      {displayFields.find(f => f.id === 'contact')?.selected && (
                        <div className="text-sm">
                          <span className="font-medium">联系人:</span> {result.contact} 
                          {result.position && displayFields.find(f => f.id === 'position')?.selected && ` (${result.position})`}
                        </div>
                      )}
                      {result.phone && displayFields.find(f => f.id === 'phone')?.selected && (
                        <div className="text-sm">
                          <span className="font-medium">电话:</span> {result.phone}
                        </div>
                      )}
                      {result.email && displayFields.find(f => f.id === 'email')?.selected && (
                        <div className="text-sm">
                          <span className="font-medium">邮箱:</span>{" "}
                          <a href={`mailto:${result.email}`} className="text-primary hover:underline">
                            {result.email}
                          </a>
                        </div>
                      )}
                      
                      <div className="flex gap-1 flex-wrap">
                        {result.wechat && displayFields.find(f => f.id === 'wechat')?.selected && (
                          <Badge variant="outline" className="text-xs">微信</Badge>
                        )}
                        {result.linkedin && displayFields.find(f => f.id === 'linkedin')?.selected && (
                          <Badge variant="outline" className="text-xs">LinkedIn</Badge>
                        )}
                        {result.twitter && displayFields.find(f => f.id === 'twitter')?.selected && (
                          <Badge variant="outline" className="text-xs">Twitter</Badge>
                        )}
                        {result.facebook && displayFields.find(f => f.id === 'facebook')?.selected && (
                          <Badge variant="outline" className="text-xs">Facebook</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              已选择 {selectedResults.length} 条数据
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
