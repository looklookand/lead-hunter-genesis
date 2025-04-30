
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Settings, X, CheckCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Field {
  id: string;
  name: string;
  selected: boolean;
  required?: boolean;
  description?: string;
  category: string;
}

const FieldsSelector = () => {
  const { toast } = useToast();
  const [newFieldName, setNewFieldName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [fields, setFields] = useState<Field[]>([
    // 基本信息
    { id: "company", name: "公司名称", selected: true, required: true, category: "基本信息", description: "公司完整名称" },
    { id: "website", name: "网址", selected: true, category: "基本信息", description: "公司官网网址" },
    { id: "address", name: "地址", selected: true, category: "基本信息", description: "公司详细地址" },
    { id: "industry", name: "行业", selected: false, category: "基本信息", description: "公司所属行业" },
    { id: "size", name: "公司规模", selected: false, category: "基本信息", description: "员工数量范围" },
    { id: "founded", name: "成立时间", selected: false, category: "基本信息", description: "公司成立年份" },
    
    // 联系信息
    { id: "phone", name: "电话", selected: true, category: "联系信息", description: "公司联系电话" },
    { id: "email", name: "邮箱", selected: true, category: "联系信息", description: "公司联系邮箱" },
    { id: "contact", name: "联系人", selected: true, category: "联系信息", description: "主要联系人" },
    { id: "position", name: "职位", selected: true, category: "联系信息", description: "联系人职位" },
    
    // 社交媒体
    { id: "linkedin", name: "LinkedIn", selected: false, category: "社交媒体", description: "LinkedIn主页" },
    { id: "twitter", name: "Twitter", selected: false, category: "社交媒体", description: "Twitter账号" },
    { id: "facebook", name: "Facebook", selected: false, category: "社交媒体", description: "Facebook主页" },
    { id: "instagram", name: "Instagram", selected: false, category: "社交媒体", description: "Instagram账号" },
    { id: "wechat", name: "微信", selected: false, category: "社交媒体", description: "微信公众号" },
    { id: "weibo", name: "微博", selected: false, category: "社交媒体", description: "微博账号" },
    
    // 其他信息
    { id: "revenue", name: "营收范围", selected: false, category: "其他信息", description: "公司年营收范围" },
    { id: "funding", name: "融资情况", selected: false, category: "其他信息", description: "公司融资轮次与金额" },
    { id: "products", name: "产品服务", selected: false, category: "其他信息", description: "主要产品或服务" },
  ]);

  const handleToggleField = (id: string) => {
    setFields(fields.map(field =>
      field.id === id && !field.required
        ? { ...field, selected: !field.selected }
        : field
    ));
  };

  const handleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    setFields(fields.map(field =>
      field.required
        ? { ...field, selected: true }
        : { ...field, selected: newValue }
    ));
  };

  const handleAddField = () => {
    if (newFieldName.trim() === "") {
      toast({
        title: "无法添加字段",
        description: "字段名称不能为空",
        variant: "destructive"
      });
      return;
    }

    const id = newFieldName.toLowerCase().replace(/\s+/g, '_');
    if (fields.some(field => field.id === id)) {
      toast({
        title: "无法添加字段",
        description: "已存在相同名称的字段",
        variant: "destructive"
      });
      return;
    }

    setFields([
      ...fields,
      {
        id,
        name: newFieldName,
        selected: true,
        category: "自定义字段",
        description: "自定义抓取字段"
      }
    ]);
    
    setNewFieldName("");
    
    toast({
      title: "添加成功",
      description: `已添加自定义字段: ${newFieldName}`
    });
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };
  
  const groupedFields = fields.reduce((groups, field) => {
    if (!groups[field.category]) {
      groups[field.category] = [];
    }
    groups[field.category].push(field);
    return groups;
  }, {} as Record<string, Field[]>);
  
  const selectedCount = fields.filter(field => field.selected).length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="select-all" 
            checked={selectAll} 
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all">全选</Label>
          <Badge variant="outline" className="ml-2">
            已选择 {selectedCount} 个字段
          </Badge>
        </div>
        
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                添加字段
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>添加自定义字段</DialogTitle>
                <DialogDescription>
                  创建新的抓取字段，将用于客户信息收集
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">字段名称</Label>
                  <Input
                    id="name"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    placeholder="例如：客户评分"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddField}>添加字段</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            <Settings className="h-4 w-4 mr-1" />
            {editMode ? "完成" : "编辑"}
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[240px] rounded-md border p-4">
        <TooltipProvider>
          {Object.entries(groupedFields).map(([category, categoryFields]) => (
            <div key={category} className="mb-4">
              <h4 className="text-sm font-medium mb-2">{category}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categoryFields.map(field => (
                  <div key={field.id} className="flex items-center justify-between space-x-2 bg-muted/40 p-2 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={field.id} 
                        checked={field.selected} 
                        onCheckedChange={() => handleToggleField(field.id)}
                        disabled={field.required}
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label 
                            htmlFor={field.id} 
                            className={`text-sm ${field.required ? 'font-medium' : ''} cursor-pointer`}
                          >
                            {field.name}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{field.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    
                    {editMode && !field.required && category === "自定义字段" && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => handleRemoveField(field.id)}
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TooltipProvider>
      </ScrollArea>
    </div>
  );
};

export default FieldsSelector;
