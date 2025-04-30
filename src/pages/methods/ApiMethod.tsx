
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const ApiMethod = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "API配置已保存",
      description: "您的API抓取设置已成功更新",
    });
  };

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">API抓取配置</h1>
        <p className="text-muted-foreground">配置基于API的客户信息抓取参数</p>
      </div>

      <Tabs defaultValue="google" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="google">Google Maps</TabsTrigger>
          <TabsTrigger value="search">搜索引擎</TabsTrigger>
          <TabsTrigger value="custom">自定义API</TabsTrigger>
        </TabsList>

        <TabsContent value="google">
          <Card>
            <CardHeader>
              <CardTitle>Google Maps API配置</CardTitle>
              <CardDescription>配置Google Maps API参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="google-api-key">API密钥</Label>
                  <Input
                    id="google-api-key"
                    type="password"
                    placeholder="输入Google Maps API密钥"
                  />
                  <p className="text-xs text-muted-foreground">
                    在Google Cloud Console获取API密钥
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="google-request-limit">每日请求限制</Label>
                  <Input
                    id="google-request-limit"
                    type="number"
                    defaultValue={1000}
                  />
                  <p className="text-xs text-muted-foreground">
                    设置每日最大API请求次数
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Places API设置</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="place-radius">搜索半径(米)</Label>
                    <Input id="place-radius" type="number" defaultValue={5000} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="place-type">场所类型</Label>
                    <Select defaultValue="business">
                      <SelectTrigger id="place-type">
                        <SelectValue placeholder="选择场所类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">商业机构</SelectItem>
                        <SelectItem value="company">公司</SelectItem>
                        <SelectItem value="store">商店</SelectItem>
                        <SelectItem value="restaurant">餐厅</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="place-language">结果语言</Label>
                    <Select defaultValue="zh-CN">
                      <SelectTrigger id="place-language">
                        <SelectValue placeholder="选择语言" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="en">英文</SelectItem>
                        <SelectItem value="ja">日文</SelectItem>
                        <SelectItem value="ko">韩文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="place-max-results">最大结果数</Label>
                    <Input
                      id="place-max-results"
                      type="number"
                      defaultValue={100}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="place-details" defaultChecked />
                  <Label htmlFor="place-details">获取详细信息</Label>
                  <p className="text-xs text-muted-foreground ml-2">
                    (包含联系电话、网站、营业时间等)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="place-photos" />
                  <Label htmlFor="place-photos">获取图片</Label>
                  <p className="text-xs text-muted-foreground ml-2">
                    (可能会增加API费用)
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  测试连接
                </Button>
                <Button onClick={handleSave}>保存配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>搜索引擎API配置</CardTitle>
              <CardDescription>配置搜索引擎API参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="search-engine">搜索引擎</Label>
                <Select defaultValue="google">
                  <SelectTrigger id="search-engine">
                    <SelectValue placeholder="选择搜索引擎" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google 搜索</SelectItem>
                    <SelectItem value="bing">Bing 搜索</SelectItem>
                    <SelectItem value="baidu">百度搜索</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="search-api-key">API密钥</Label>
                  <Input
                    id="search-api-key"
                    type="password"
                    placeholder="输入搜索API密钥"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search-endpoint">API端点</Label>
                  <Input
                    id="search-endpoint"
                    placeholder="https://api.example.com/search/v1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search-results">每页结果数</Label>
                  <Input id="search-results" type="number" defaultValue={10} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search-pages">最大搜索页数</Label>
                  <Input id="search-pages" type="number" defaultValue={5} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">高级设置</h3>

                <div className="flex items-center space-x-2">
                  <Switch id="search-website-scrape" defaultChecked />
                  <Label htmlFor="search-website-scrape">抓取搜索结果网站</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="search-exclude-ads" defaultChecked />
                  <Label htmlFor="search-exclude-ads">排除广告结果</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="search-filter-duplicates" defaultChecked />
                  <Label htmlFor="search-filter-duplicates">过滤重复结果</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  测试搜索
                </Button>
                <Button onClick={handleSave}>保存配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>自定义API配置</CardTitle>
              <CardDescription>配置自定义API参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="custom-name">API名称</Label>
                  <Input id="custom-name" placeholder="输入API名称" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-desc">描述</Label>
                  <Input id="custom-desc" placeholder="简要描述此API" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-endpoint">API端点</Label>
                  <Input
                    id="custom-endpoint"
                    placeholder="https://api.example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-method">请求方法</Label>
                  <Select defaultValue="GET">
                    <SelectTrigger id="custom-method">
                      <SelectValue placeholder="选择请求方法" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="custom-auth">认证头</Label>
                  <Input
                    id="custom-auth"
                    placeholder="Bearer YOUR_API_KEY"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="custom-params">请求参数模板 (JSON)</Label>
                  <Input
                    id="custom-params"
                    placeholder='{"query": "{keyword}", "location": "{location}"}'
                  />
                  <p className="text-xs text-muted-foreground">
                    使用 {'{keyword}'}, {'{location}'} 等作为变量占位符
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">响应解析</h3>

                <div className="space-y-2">
                  <Label htmlFor="custom-json-path">JSON路径表达式</Label>
                  <Input
                    id="custom-json-path"
                    placeholder="$.results[*]"
                  />
                  <p className="text-xs text-muted-foreground">
                    使用JSONPath语法指定数据位置
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-company">公司名称字段</Label>
                    <Input id="custom-company" placeholder="name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-website">网址字段</Label>
                    <Input id="custom-website" placeholder="website" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-address">地址字段</Label>
                    <Input id="custom-address" placeholder="address" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-phone">电话字段</Label>
                    <Input id="custom-phone" placeholder="phone" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-contact">联系人字段</Label>
                    <Input id="custom-contact" placeholder="contact" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-position">职位字段</Label>
                    <Input id="custom-position" placeholder="position" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  测试API
                </Button>
                <Button onClick={handleSave}>保存配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiMethod;
