
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, Mail, Code } from "lucide-react";

const ContactDeveloper = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("feature");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "请完成所有必填字段",
        description: "姓名、邮箱和消息内容为必填项",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // 模拟提交过程
    setTimeout(() => {
      toast({
        title: "消息已发送",
        description: "我们已收到您的请求，会尽快与您联系",
      });
      
      // 重置表单
      setName("");
      setEmail("");
      setSubject("feature");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">联系开发者</h1>
        <p className="text-muted-foreground">有任何问题或自定义需求？请随时联系我们</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>提交您的需求</CardTitle>
                <CardDescription>
                  填写以下表单，我们会尽快回复您的请求
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名 <span className="text-red-500">*</span></Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="您的姓名" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱 <span className="text-red-500">*</span></Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="您的邮箱地址" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">主题类型</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="选择主题类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feature">功能需求</SelectItem>
                      <SelectItem value="bug">问题反馈</SelectItem>
                      <SelectItem value="question">使用咨询</SelectItem>
                      <SelectItem value="custom">自定义开发</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">详细描述 <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="请详细描述您的需求或问题..." 
                    rows={6} 
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachment">附件</Label>
                  <Input 
                    id="attachment" 
                    type="file" 
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    支持文档、截图、视频等相关文件（可选）
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>提交中...</>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      提交需求
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>联系方式</CardTitle>
              <CardDescription>
                您也可以通过以下方式直接联系我们
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">电子邮件</h4>
                  <p className="text-sm text-muted-foreground">support@example.com</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    工作日24小时内回复
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">常见需求类型</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    自定义抓取模块开发
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    数据导出格式定制
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    第三方系统集成
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    高级筛选功能定制
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    企业专用功能开发
                  </li>
                </ul>
              </div>
              
              <div>
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <Code className="mr-2 h-4 w-4" />
                  查看API文档
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactDeveloper;
