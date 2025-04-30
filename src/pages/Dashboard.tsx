
import React from "react";
import { 
  Search, 
  FileText, 
  List,
  Settings,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const statCards = [
    { title: "总抓取数量", value: "0", description: "客户信息", color: "bg-blue-50 text-blue-600" },
    { title: "今日抓取", value: "0", description: "客户信息", color: "bg-green-50 text-green-600" },
    { title: "数据字段", value: "6", description: "可自定义", color: "bg-amber-50 text-amber-600" }
  ];
  
  const featureCards = [
    { 
      title: "搜索抓取", 
      description: "通过关键词和地区筛选条件抓取客户信息", 
      icon: <Search className="h-6 w-6" />, 
      path: "/search",
      color: "border-l-4 border-brand-blue"
    },
    { 
      title: "数据导入", 
      description: "导入邮箱列表或网址列表进行抓取", 
      icon: <FileText className="h-6 w-6" />, 
      path: "/import",
      color: "border-l-4 border-brand-emerald"
    },
    { 
      title: "抓取结果", 
      description: "以列表形式展示抓取结果，可筛选导出", 
      icon: <List className="h-6 w-6" />, 
      path: "/results",
      color: "border-l-4 border-purple-500"
    },
    { 
      title: "系统设置", 
      description: "配置抓取方法和字段设置", 
      icon: <Settings className="h-6 w-6" />, 
      path: "/settings",
      color: "border-l-4 border-amber-500"
    }
  ];

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">欢迎使用LeadHunter</h1>
        <p className="text-muted-foreground">专业的客户信息抓取系统，三种抓取方式，多维度筛选</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Card key={index} className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">{card.value}</span>
                <span className={`${card.color} text-sm px-2 py-1 rounded-full`}>
                  {card.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <h2 className="text-xl font-semibold mb-4">快速入口</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featureCards.map((card, index) => (
          <Card key={index} className={`${card.color} card-hover`}>
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  {card.icon}
                </div>
              </div>
              <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
              <CardDescription className="mb-4">{card.description}</CardDescription>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => navigate(card.path)}
              >
                进入 <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">抓取方式</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="method-card">
          <div className="text-xs font-semibold rounded-full bg-blue-100 text-blue-600 px-2 py-1 w-fit mb-4">API</div>
          <h3 className="text-lg font-medium mb-2">API抓取</h3>
          <p className="text-muted-foreground text-sm mb-4">
            通过Google Map、搜索引擎等API接口抓取数据
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate("/methods/api")} className="mt-auto">
            配置
          </Button>
        </div>
        
        <div className="method-card">
          <div className="text-xs font-semibold rounded-full bg-green-100 text-green-600 px-2 py-1 w-fit mb-4">AI</div>
          <h3 className="text-lg font-medium mb-2">AI模型工具</h3>
          <p className="text-muted-foreground text-sm mb-4">
            利用N8N/DIFY等外接AI工具的工作流实现
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate("/methods/ai")} className="mt-auto">
            配置
          </Button>
        </div>
        
        <div className="method-card">
          <div className="text-xs font-semibold rounded-full bg-purple-100 text-purple-600 px-2 py-1 w-fit mb-4">MCP</div>
          <h3 className="text-lg font-medium mb-2">MCP服务</h3>
          <p className="text-muted-foreground text-sm mb-4">
            利用Claude公开协议实现数据抓取
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate("/methods/mcp")} className="mt-auto">
            配置
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
