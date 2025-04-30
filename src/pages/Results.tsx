
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 示例数据
const sampleResults = [
  {
    id: 1,
    company: "科技未来有限公司",
    website: "future-tech.com",
    address: "中国北京市海淀区中关村1号",
    phone: "+86 10 1234 5678",
    contact: "张经理",
    position: "市场总监",
    source: "API"
  },
  {
    id: 2,
    company: "数据智能科技有限公司",
    website: "data-smart.cn",
    address: "中国上海市浦东新区张江高科技园区",
    phone: "+86 21 8765 4321",
    contact: "李总",
    position: "CEO",
    source: "API"
  },
  {
    id: 3,
    company: "云创网络科技有限公司",
    website: "cloud-create.net",
    address: "中国广州市天河区珠江新城",
    phone: "+86 20 2345 6789",
    contact: "王工",
    position: "技术总监",
    source: "AI"
  },
  {
    id: 4,
    company: "智慧解决方案有限公司",
    website: "smart-solutions.org",
    address: "中国深圳市南山区科技园",
    phone: "+86 755 3456 7890",
    contact: "陈经理",
    position: "销售总监",
    source: "MCP"
  },
  {
    id: 5,
    company: "创新互联网科技有限公司",
    website: "innovative-net.com",
    address: "中国杭州市西湖区文三路",
    phone: "+86 571 4567 8901",
    contact: "赵总",
    position: "运营总监",
    source: "API"
  }
];

const Results = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedResults, setSelectedResults] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [filterSource, setFilterSource] = useState<string | null>(null);
  
  // 处理全选
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedResults([]);
    } else {
      setSelectedResults(sampleResults.map(r => r.id));
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
      if (selectedResults.length + 1 === sampleResults.length) {
        setSelectAll(true);
      }
    }
  };
  
  // 处理导出
  const handleExport = (format: string) => {
    const count = selectedResults.length > 0 
      ? selectedResults.length 
      : sampleResults.length;
      
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
      result.website.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = filterSource === null || result.source === filterSource;
    
    return matchesSearch && matchesFilter;
  });

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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectAll} 
                      onCheckedChange={handleSelectAll} 
                    />
                  </TableHead>
                  <TableHead>公司名称</TableHead>
                  <TableHead>网址</TableHead>
                  <TableHead className="hidden md:table-cell">地址</TableHead>
                  <TableHead>联系人</TableHead>
                  <TableHead className="hidden md:table-cell">职位</TableHead>
                  <TableHead>联系电话</TableHead>
                  <TableHead className="w-[80px]">来源</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {filteredResults.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
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
                      <TableCell className="font-medium">{result.company}</TableCell>
                      <TableCell>
                        <a href={`https://${result.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {result.website}
                        </a>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{result.address}</TableCell>
                      <TableCell>{result.contact}</TableCell>
                      <TableCell className="hidden md:table-cell">{result.position}</TableCell>
                      <TableCell>{result.phone}</TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
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
