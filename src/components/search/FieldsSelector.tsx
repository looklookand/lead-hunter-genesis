
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const defaultFields = [
  { id: "company", name: "公司名称", selected: true, required: true },
  { id: "website", name: "网址", selected: true, required: false },
  { id: "address", name: "地址", selected: true, required: false },
  { id: "phone", name: "电话", selected: true, required: false },
  { id: "contact", name: "联系人", selected: true, required: false },
  { id: "position", name: "职位", selected: true, required: false },
];

const FieldsSelector = () => {
  const [fields, setFields] = useState(defaultFields);
  const [newField, setNewField] = useState("");
  
  // 全选/取消全选
  const handleSelectAll = () => {
    setFields(fields.map(field => ({
      ...field,
      selected: true
    })));
  };
  
  const handleDeselectAll = () => {
    setFields(fields.map(field => ({
      ...field,
      selected: field.required ? true : false
    })));
  };
  
  // 单个字段选择
  const handleFieldChange = (id: string, checked: boolean) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, selected: field.required ? true : checked } : field
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">选择需要抓取的字段</h4>
          <p className="text-sm text-muted-foreground">
            勾选您需要获取的公司信息数据字段
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handleSelectAll}>全选</Button>
          <Button variant="outline" size="sm" onClick={handleDeselectAll}>取消全选</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {fields.map((field) => (
          <div key={field.id} className="flex items-start space-x-2">
            <Checkbox 
              id={`field-${field.id}`} 
              checked={field.selected} 
              disabled={field.required}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <div className="flex items-center gap-2">
                <Label 
                  htmlFor={`field-${field.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {field.name}
                </Label>
                {field.required && (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                    必填
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="text-sm text-muted-foreground">
        已选择 {fields.filter(f => f.selected).length} 个字段，{fields.filter(f => f.required).length} 个必填字段
      </div>
    </div>
  );
};

export default FieldsSelector;
