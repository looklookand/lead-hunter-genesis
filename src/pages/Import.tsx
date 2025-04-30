
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import FieldsSelector from "@/components/search/FieldsSelector";

const Import = () => {
  const { toast } = useToast();
  const [importType, setImportType] = useState<string>("emails");
  const [inputText, setInputText] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState<string>("api");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "文件已选择",
        description: `${file.name} (${Math.round(file.size / 1024)} KB)`
      });
    }
  };
  
  const handleUpload = () => {
    if (!inputText && !selectedFile) {
      toast({
        title: "无法开始导入",
        description: "请输入数据或选择文件",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "导入完成",
            description: "数据已成功导入，准备开始抓取"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const handleStartImport = () => {
    toast({
      title: "开始抓取",
      description: `使用${selectedMethod.toUpperCase()}方法开始抓取客户信息`
    });
  };

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">数据导入</h1>
        <p className="text-muted-foreground">导入邮箱列表或网址列表进行客户信息抓取</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>数据导入</CardTitle>
              <CardDescription>选择导入类型并上传数据</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="emails" 
                onValueChange={(value) => setImportType(value)}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="emails">邮箱列表</TabsTrigger>
                  <TabsTrigger value="urls">网址列表</TabsTrigger>
                </TabsList>
                
                <TabsContent value="emails" className="space-y-4">
                  <div>
                    <Label htmlFor="email-input">输入邮箱列表</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      每行一个邮箱地址，或使用逗号分隔
                    </p>
                    <Textarea
                      id="email-input"
                      placeholder="example@company.com, user@business.com"
                      className="h-40"
                      value={inputText}
                      onChange={handleTextInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email-file" className="block mb-2">或上传CSV/TXT文件</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-muted/50">
                      <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-4">拖拽文件到此处或点击上传</p>
                      <Button variant="outline" className="relative">
                        <Upload className="h-4 w-4 mr-2" />
                        选择文件
                        <input
                          id="email-file"
                          type="file"
                          accept=".csv,.txt,.xlsx"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                      </Button>
                      {selectedFile && (
                        <p className="text-sm mt-2">{selectedFile.name}</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="urls" className="space-y-4">
                  <div>
                    <Label htmlFor="url-input">输入网址列表</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      每行一个URL，或使用逗号分隔
                    </p>
                    <Textarea
                      id="url-input"
                      placeholder="https://company.com, https://business.org"
                      className="h-40"
                      value={inputText}
                      onChange={handleTextInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="url-file" className="block mb-2">或上传CSV/TXT文件</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-muted/50">
                      <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-4">拖拽文件到此处或点击上传</p>
                      <Button variant="outline" className="relative">
                        <Upload className="h-4 w-4 mr-2" />
                        选择文件
                        <input
                          id="url-file"
                          type="file"
                          accept=".csv,.txt,.xlsx"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                      </Button>
                      {selectedFile && (
                        <p className="text-sm mt-2">{selectedFile.name}</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {isUploading ? (
                <div className="mt-6">
                  <Label className="text-sm text-muted-foreground mb-2">上传进度</Label>
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-right mt-1">{uploadProgress}%</p>
                </div>
              ) : (
                <Button 
                  className="mt-6" 
                  onClick={handleUpload}
                >
                  上传数据
                </Button>
              )}
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
                  
                  <div>
                    <Label htmlFor="api-rate">请求速率</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger id="api-rate">
                        <SelectValue placeholder="选择请求速率" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">慢速 (每分钟10次)</SelectItem>
                        <SelectItem value="normal">正常 (每分钟30次)</SelectItem>
                        <SelectItem value="fast">快速 (每分钟60次)</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label htmlFor="ai-endpoint">工作流终端</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="ai-endpoint">
                        <SelectValue placeholder="选择工作流终端" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">默认终端</SelectItem>
                        <SelectItem value="custom">自定义终端</SelectItem>
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
                  
                  <div>
                    <Label htmlFor="mcp-batch">批处理大小</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="mcp-batch">
                        <SelectValue placeholder="选择批处理大小" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">小批量 (每批10条)</SelectItem>
                        <SelectItem value="medium">中批量 (每批50条)</SelectItem>
                        <SelectItem value="large">大批量 (每批100条)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Button 
                className="w-full mt-6" 
                onClick={handleStartImport}
                disabled={isUploading}
              >
                开始抓取
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>导入提示</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-4">
                <div>
                  <h4 className="font-medium mb-1">支持的格式</h4>
                  <p className="text-muted-foreground">CSV, TXT, Excel文件或直接粘贴数据</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">邮箱列表</h4>
                  <p className="text-muted-foreground">上传包含邮箱地址的文件，我们将自动提取公司域名</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">网址列表</h4>
                  <p className="text-muted-foreground">上传包含公司网站URL的文件，系统将访问并抓取联系信息</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Import;
