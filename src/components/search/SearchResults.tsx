
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
    source: "API"
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
    source: "API"
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
    source: "AI"
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
    source: "MCP"
  },
];

const SearchResults = () => {
  const { toast } = useToast();
  const [processingStatus, setProcessingStatus] = useState({
    total: 10,
    processed: 4,
    progress: 40,
    status: "processing" // "processing", "completed", "error"
  });

  const handleExport = (format: string) => {
    toast({
      title: "导出结果",
      description: `将搜索结果导出为${format.toUpperCase()}格式`
    });
  };

  const handleSaveResults = () => {
    toast({
      title: "保存成功",
      description: "已将搜索结果保存到系统中"
    });
  };

  return (
    <Card className="mt-8">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-xl flex items-center">
              <span>搜索结果</span>
              <Badge className="ml-2">{sampleResults.length} 条结果</Badge>
            </CardTitle>
            <CardDescription>以下是根据您的搜索条件找到的客户信息</CardDescription>
          </div>
          
          {processingStatus.status === "processing" && (
            <div className="min-w-[200px]">
              <div className="flex justify-between text-sm mb-1">
                <span>正在抓取</span>
                <span>{processingStatus.processed}/{processingStatus.total}</span>
              </div>
              <Progress value={processingStatus.progress} />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="table">
          <TabsList className="mb-4">
            <TabsTrigger value="table">表格视图</TabsTrigger>
            <TabsTrigger value="card">卡片视图</TabsTrigger>
          </TabsList>
          
          <TabsContent value="table">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>公司名称</TableHead>
                    <TableHead>网址</TableHead>
                    <TableHead className="hidden lg:table-cell">地址</TableHead>
                    <TableHead>联系人</TableHead>
                    <TableHead className="hidden md:table-cell">职位</TableHead>
                    <TableHead>电话</TableHead>
                    <TableHead className="hidden md:table-cell">邮箱</TableHead>
                    <TableHead className="hidden lg:table-cell">社交媒体</TableHead>
                    <TableHead className="w-[80px]">来源</TableHead>
                  </TableRow>
                </TableHeader>
                
                <TableBody>
                  {sampleResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.company}</TableCell>
                      <TableCell>
                        <a href={`https://${result.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {result.website}
                        </a>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{result.address}</TableCell>
                      <TableCell>{result.contact}</TableCell>
                      <TableCell className="hidden md:table-cell">{result.position}</TableCell>
                      <TableCell>{result.phone}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <a href={`mailto:${result.email}`} className="text-primary hover:underline">
                          {result.email}
                        </a>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex space-x-1">
                          {result.wechat && <Badge variant="outline" className="text-xs">微信</Badge>}
                          {result.linkedin && <Badge variant="outline" className="text-xs">LinkedIn</Badge>}
                          {result.twitter && <Badge variant="outline" className="text-xs">Twitter</Badge>}
                        </div>
                      </TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleResults.map((result) => (
                <Card key={result.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{result.company}</CardTitle>
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
                    <CardDescription>
                      <a href={`https://${result.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {result.website}
                      </a>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <div className="text-sm">
                      <span className="font-medium">地址:</span> {result.address}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">联系人:</span> {result.contact} ({result.position})
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">电话:</span> {result.phone}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">邮箱:</span>{" "}
                      <a href={`mailto:${result.email}`} className="text-primary hover:underline">
                        {result.email}
                      </a>
                    </div>
                    <div className="text-sm flex gap-1 flex-wrap">
                      <span className="font-medium">社交:</span>
                      {result.wechat && <Badge variant="outline" className="text-xs">微信: {result.wechat}</Badge>}
                      {result.linkedin && <Badge variant="outline" className="text-xs">LinkedIn</Badge>}
                      {result.twitter && <Badge variant="outline" className="text-xs">Twitter</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          查看全部结果
        </Button>
        
        <div className="space-x-2">
          <select 
            className="bg-background border rounded-md px-3 py-1 text-sm"
            onChange={(e) => e.target.value && handleExport(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>导出为...</option>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
            <option value="json">JSON</option>
          </select>
          <Button onClick={handleSaveResults}>
            保存结果
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SearchResults;
