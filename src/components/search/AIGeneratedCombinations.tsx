
import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCheck, Plus, Trash, Brain, Edit, Save, RotateCcw } from "lucide-react";

interface Combination {
  id: number;
  query: string;
  keyword: string;
  location: string;
  selected: boolean;
}

const defaultTemplateOptions = [
  { id: "default", name: "默认模版", template: "{关键词} {地区}" },
  { id: "customer", name: "客户查询模版", template: "寻找{地区}的{关键词}公司" },
  { id: "supplier", name: "供应商模版", template: "{关键词}供应商 {地区}" },
  { id: "service", name: "服务商模版", template: "{地区} {关键词}服务" },
  { id: "custom", name: "自定义模版", template: "" }
];

const defaultAiCommand = "根据提供的关键词和地区，生成最佳的搜索组合，包含查询语句";

const AIGeneratedCombinations = () => {
  const { toast } = useToast();
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("default");
  const [customTemplate, setCustomTemplate] = useState("");
  const [keywords] = useState(["软件开发", "数据分析", "市场营销"]);
  const [locations] = useState(["北京", "上海", "广州", "深圳"]);
  const [selectAll, setSelectAll] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCommandEdit, setShowCommandEdit] = useState(false);
  const [aiCommand, setAiCommand] = useState(defaultAiCommand);
  const [selectedAiModel, setSelectedAiModel] = useState("gpt4");
  const [templateOptions, setTemplateOptions] = useState(defaultTemplateOptions);
  const [customAiModels, setCustomAiModels] = useState([
    { id: "gpt4", name: "GPT-4" },
    { id: "gpt4o", name: "GPT-4o" },
    { id: "claude", name: "Claude" },
    { id: "gemini", name: "Google Gemini" },
    { id: "custom", name: "自定义模型" }
  ]);
  const [newModelName, setNewModelName] = useState("");
  const [showAddModel, setShowAddModel] = useState(false);
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // 获取当前选定的模板
    const currentTemplate = selectedTemplate === "custom" 
      ? customTemplate 
      : templateOptions.find(t => t.id === selectedTemplate)?.template || "{关键词} {地区}";
    
    // 清空现有组合
    setCombinations([]);
    
    toast({
      title: `AI正在生成组合 (${selectedAiModel})`,
      description: "请稍等，基于您的关键词和地区生成查询组合"
    });
    
    // 模拟生成过程
    setTimeout(() => {
      const newCombinations: Combination[] = [];
      let id = 1;
      
      keywords.forEach(keyword => {
        locations.forEach(location => {
          const query = currentTemplate
            .replace("{关键词}", keyword)
            .replace("{地区}", location);
            
          newCombinations.push({
            id: id++,
            query,
            keyword,
            location,
            selected: false
          });
        });
      });
      
      setCombinations(newCombinations);
      setIsGenerating(false);
      
      toast({
        title: "组合生成完成",
        description: `已生成 ${newCombinations.length} 个查询组合`
      });
    }, 1500);
  };
  
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCombinations(combinations.map(c => ({
      ...c,
      selected: !selectAll
    })));
  };
  
  const handleSelectCombination = (id: number) => {
    setCombinations(combinations.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    ));
    
    // 更新全选状态
    const allSelected = combinations.every(c => 
      c.id === id ? !c.selected : c.selected
    );
    setSelectAll(allSelected);
  };
  
  const handleDeleteSelected = () => {
    const selectedCount = combinations.filter(c => c.selected).length;
    
    if (selectedCount === 0) {
      toast({
        title: "未选择任何组合",
        description: "请至少选择一个组合进行删除",
        variant: "destructive"
      });
      return;
    }
    
    setCombinations(combinations.filter(c => !c.selected));
    setSelectAll(false);
    
    toast({
      title: "已删除所选组合",
      description: `已删除 ${selectedCount} 个查询组合`
    });
  };
  
  const handleAdd = () => {
    // 处理所选组合
    const selectedCombinations = combinations.filter(c => c.selected);
    
    if (selectedCombinations.length === 0) {
      toast({
        title: "未选择任何组合",
        description: "请至少选择一个组合进行添加",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "已添加所选组合",
      description: `已添加 ${selectedCombinations.length} 个查询组合到搜索列表`
    });
  };
  
  const handleSaveTemplate = () => {
    if (selectedTemplate === "custom" && customTemplate) {
      // 保存自定义模板
      setTemplateOptions(prev => {
        const customIndex = prev.findIndex(t => t.id === "custom");
        const updatedOptions = [...prev];
        updatedOptions[customIndex] = { ...updatedOptions[customIndex], template: customTemplate };
        return updatedOptions;
      });
      
      toast({
        title: "模板已保存",
        description: "自定义模板已成功保存"
      });
    } else if (selectedTemplate !== "custom") {
      // 更新已有模板
      const selectedOption = templateOptions.find(t => t.id === selectedTemplate);
      if (selectedOption) {
        const updatedTemplate = prompt("请编辑模板内容:", selectedOption.template);
        
        if (updatedTemplate !== null && updatedTemplate !== selectedOption.template) {
          setTemplateOptions(prev => 
            prev.map(t => 
              t.id === selectedTemplate ? { ...t, template: updatedTemplate } : t
            )
          );
          
          toast({
            title: "模板已更新",
            description: `${selectedOption.name} 模板已成功更新`
          });
        }
      }
    }
  };
  
  const handleResetToDefault = () => {
    setAiCommand(defaultAiCommand);
    setTemplateOptions(defaultTemplateOptions);
    
    toast({
      title: "已重置为默认命令",
      description: "AI命令和模板已恢复为默认设置"
    });
  };
  
  const handleAddCustomModel = () => {
    if (!newModelName.trim()) {
      toast({
        title: "无法添加模型",
        description: "请输入有效的模型名称",
        variant: "destructive"
      });
      return;
    }
    
    const newModelId = newModelName.toLowerCase().replace(/\s+/g, "-");
    
    setCustomAiModels(prev => [
      ...prev.filter(m => m.id !== "custom"),
      { id: newModelId, name: newModelName },
      { id: "custom", name: "自定义模型" }
    ]);
    
    setNewModelName("");
    setShowAddModel(false);
    
    toast({
      title: "已添加自定义模型",
      description: `模型 "${newModelName}" 已成功添加`
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI组合生成器</CardTitle>
        <CardDescription>
          基于关键词和地区自动生成组合查询
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>模板选择</Label>
              <div className="space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowCommandEdit(!showCommandEdit)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3.5 w-3.5" />
                  {showCommandEdit ? "隐藏AI命令" : "编辑AI命令"}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSaveTemplate}
                  className="flex items-center gap-1"
                >
                  <Save className="h-3.5 w-3.5" />
                  保存模板
                </Button>
              </div>
            </div>
            
            <Select 
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择模板" />
              </SelectTrigger>
              <SelectContent>
                {templateOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {showCommandEdit && (
              <div className="p-3 border rounded-md bg-muted/20 mt-2 space-y-3">
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="ai-model" className="text-sm">AI模型</Label>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setShowAddModel(!showAddModel)}
                    >
                      {showAddModel ? "取消" : "添加自定义模型"}
                    </Button>
                  </div>
                  <Select 
                    value={selectedAiModel}
                    onValueChange={setSelectedAiModel}
                  >
                    <SelectTrigger id="ai-model">
                      <SelectValue placeholder="选择AI模型" />
                    </SelectTrigger>
                    <SelectContent>
                      {customAiModels.map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {showAddModel && (
                  <div className="flex gap-2">
                    <Input
                      value={newModelName}
                      onChange={(e) => setNewModelName(e.target.value)}
                      placeholder="输入自定义模型名称"
                    />
                    <Button size="sm" onClick={handleAddCustomModel}>添加</Button>
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="ai-generate-command" className="text-sm">生成命令</Label>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleResetToDefault}
                      className="flex items-center gap-1"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      恢复默认
                    </Button>
                  </div>
                  <Textarea
                    id="ai-generate-command"
                    value={aiCommand}
                    onChange={(e) => setAiCommand(e.target.value)}
                    className="font-mono text-sm"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    命令将用于指导AI如何生成关键词与地区的组合
                  </p>
                </div>
              </div>
            )}
            
            {selectedTemplate === "custom" && (
              <div className="mt-2">
                <Label htmlFor="customTemplate">自定义模板</Label>
                <Input
                  id="customTemplate"
                  value={customTemplate}
                  onChange={(e) => setCustomTemplate(e.target.value)}
                  placeholder="例如: 寻找{地区}的{关键词}客户"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  使用 {"{关键词}"} 和 {"{地区}"} 作为占位符
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Badge variant="outline" className="mr-2">
                {keywords.length} 个关键词
              </Badge>
              <Badge variant="outline">
                {locations.length} 个地区
              </Badge>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="flex items-center gap-1"
            >
              <Brain className="h-4 w-4" />
              {isGenerating ? "生成中..." : "生成组合"}
            </Button>
          </div>
          
          {combinations.length > 0 && (
            <>
              <div className="rounded-md border overflow-hidden mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={selectAll && combinations.length > 0} 
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>查询组合</TableHead>
                      <TableHead className="hidden md:table-cell">关键词</TableHead>
                      <TableHead className="hidden md:table-cell">地区</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {combinations.map(combination => (
                      <TableRow key={combination.id}>
                        <TableCell>
                          <Checkbox 
                            checked={combination.selected}
                            onCheckedChange={() => handleSelectCombination(combination.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{combination.query}</TableCell>
                        <TableCell className="hidden md:table-cell">{combination.keyword}</TableCell>
                        <TableCell className="hidden md:table-cell">{combination.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  已选择 {combinations.filter(c => c.selected).length} 个组合
                </p>
                
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDeleteSelected}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    删除所选
                  </Button>
                  
                  <Button size="sm" onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-1" />
                    添加所选
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIGeneratedCombinations;
