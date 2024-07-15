"use client"

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function NewRequirement() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>新需求</CardTitle>
                <CardDescription>立即制定项目目标</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">标题</Label>
                            <Input id="title" placeholder="新需求" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    新建
                </Button>
            </CardFooter>
        </Card>
    );
}
