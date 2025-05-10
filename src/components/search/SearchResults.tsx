
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
import { toast } from "@/components/ui/sonner";

// Define prop types for the component
interface Company {
  name: string;
  website?: string;
  address?: string;
  phone?: string;
  email?: string;
  contact?: string;
  position?: string;
  wechat?: string;
  linkedin?: string;
  twitter?: string;
  source?: string;
}

interface SearchResultsProps {
  results?: Company[];
  isProcessing?: boolean;
  progress?: number;
}

const SearchResults = ({ 
  results = [], 
  isProcessing = false, 
  progress = 100 
}: SearchResultsProps) => {
  const [processingStatus] = useState({
    total: results.length || 10,
    processed: results.length || 4,
    progress: progress,
    status: isProcessing ? "processing" : "completed"
  });

  // Use the provided results or sample data if none provided
  const displayResults = results.length > 0 ? results : [
    {
      name: "科技未来有限公司",
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
      name: "数据智能科技有限公司",
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
      name: "云创网络科技有限公司",
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
      name: "智慧解决方案有限公司",
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

  const handleExport = (format: string) => {
    toast.info("导出结果", {
      description: `将搜索结果导出为${format.toUpperCase()}格式`
    });
    
    // Simple CSV export implementation
    if (format === 'csv') {
      try {
        // Create CSV header
        const headers = ["公司名称", "网址", "地址", "电话", "邮箱"];
        
        // Create CSV data rows
        const dataRows = displayResults.map(company => [
          company.name || '',
          company.website || '',
          company.address || '',
          company.phone || '',
          company.email || ''
        ]);
        
        // Combine headers and data
        const csvContent = [
          headers.join(','),
          ...dataRows.map(row => row.join(','))
        ].join('\n');
        
        // Create downloadable link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `company_search_results_${new Date().toISOString().slice(0,10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success("导出成功", {
          description: "CSV文件已下载"
        });
      } catch (err) {
        toast.error("导出失败", {
          description: "无法导出为CSV格式"
        });
      }
    }
  };

  const handleSaveResults = () => {
    toast.success("保存成功", {
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
              <Badge className="ml-2">{displayResults.length} 条结果</Badge>
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
                  {displayResults.map((result, index) => (
                    <TableRow key={`result-${index}`}>
                      <TableCell className="font-medium">{result.name}</TableCell>
                      <TableCell>
                        {result.website && (
                          <a href={`https://${result.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {result.website}
                          </a>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{result.address}</TableCell>
                      <TableCell>{result.contact || '-'}</TableCell>
                      <TableCell className="hidden md:table-cell">{result.position || '-'}</TableCell>
                      <TableCell>{result.phone || '-'}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {result.email && (
                          <a href={`mailto:${result.email}`} className="text-primary hover:underline">
                            {result.email}
                          </a>
                        )}
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
                          {result.source || 'API'}
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
              {displayResults.map((result, index) => (
                <Card key={`card-${index}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{result.name}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={
                          result.source === "API" ? "bg-blue-50 text-blue-600 border-blue-200" :
                          result.source === "AI" ? "bg-green-50 text-green-600 border-green-200" :
                          "bg-purple-50 text-purple-600 border-purple-200"
                        }
                      >
                        {result.source || 'API'}
                      </Badge>
                    </div>
                    <CardDescription>
                      {result.website && (
                        <a href={`https://${result.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {result.website}
                        </a>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <div className="text-sm">
                      <span className="font-medium">地址:</span> {result.address || '未知'}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">联系人:</span> {result.contact ? `${result.contact} (${result.position || '未知'})` : '未知'}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">电话:</span> {result.phone || '未知'}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">邮箱:</span>{" "}
                      {result.email ? (
                        <a href={`mailto:${result.email}`} className="text-primary hover:underline">
                          {result.email}
                        </a>
                      ) : '未知'}
                    </div>
                    <div className="text-sm flex gap-1 flex-wrap">
                      <span className="font-medium">社交:</span>
                      {result.wechat && <Badge variant="outline" className="text-xs">微信: {result.wechat}</Badge>}
                      {result.linkedin && <Badge variant="outline" className="text-xs">LinkedIn</Badge>}
                      {result.twitter && <Badge variant="outline" className="text-xs">Twitter</Badge>}
                      {!result.wechat && !result.linkedin && !result.twitter && <span className="text-muted-foreground">未知</span>}
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
