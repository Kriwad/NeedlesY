import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SocialCard(
    {
        name , 
        
    }
) {
  return (
    <Card className="w-[400px] max-w-[90vw]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">krish khatyauda</p>
            <p className="text-xs text-muted-foreground">4 days ago</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
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
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground">dwawdwdwdawdawdawdawdawdasx cscwdaxscwdwwdwawdawdasdawdawdawdd</p>
        <div className="mt-4 flex justify-end gap-4">
          <Button variant="ghost" size="icon" className="h-auto p-0">
            <Heart className="h-5 w-5 text-primary" />
            <span className="sr-only">Like</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-auto p-0">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="sr-only">Comment</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}