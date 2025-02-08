import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SocialCard() {
  return (
    <Card className="w-[400px] max-w-[90vw]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src= {todo.user.image} alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <button onClick={()=> navigate(`profile/${todo.user.id}`)} className="text-sm font-medium">{todo.user.username}</button>
            <p className="text-xs text-muted-foreground">
              {todo.created_at && formatDistanceToNow(new Date(todo.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button  variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-6">
        <p className="text-sm text-muted-foreground">{todo.title}</p>
        <p className="text-sm text-muted-foreground">{todo.goals}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" size="sm" className="text-primary">
            <Heart className="mr-1 h-4 w-4" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="text-primary">
            <MessageCircle className="mr-1 h-4 w-4" />
            Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

