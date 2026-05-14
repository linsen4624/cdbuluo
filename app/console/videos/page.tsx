import Uploader from "@/components/file-upload-dropzone-1";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const videos = [
  {
    id: "001",
    client: "帅呆了",
    title: "上海变装定拍视频",
    size: "24MB",
    date: "2026-03-24",
    status: "已发布",
    type: "职场女性",
  },
  {
    id: "002",
    client: "豆腐干",
    title: "北京化妆聚会",
    size: "12MB",
    date: "2026-02-15",
    status: "已发布",
    type: "多风格",
  },
  {
    id: "003",
    client: "撒旦发射点",
    title: "上海变装定拍视频",
    size: "26MB",
    date: "2026-04-25",
    status: "已上传",
    type: "职场丽人",
  },
  {
    id: "004",
    client: "士大夫",
    title: "上海变装定拍视频",
    size: "45MB",
    date: "2026-03-14",
    status: "已上传",
    type: "休闲女性",
  },
  {
    id: "005",
    client: "史蒂夫",
    title: "高级变装定拍视频",
    size: "48MB",
    date: "2026-04-16",
    status: "已上传",
    type: "幸福新娘",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 items-start">
        <span className="font-semibold text-basis">视频管理</span>
      </div>

      <Uploader />

      <div className="border p-4">
        <Table>
          <TableCaption>点击查看更多</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">编号</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>客户</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>视频大小</TableHead>
              <TableHead>拍摄日期</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.id}</TableCell>
                <TableCell>{u.title}</TableCell>
                <TableCell>{u.client}</TableCell>
                <TableCell>{u.type}</TableCell>
                <TableCell>{u.size}</TableCell>
                <TableCell>{u.date}</TableCell>
                <TableCell>{u.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
