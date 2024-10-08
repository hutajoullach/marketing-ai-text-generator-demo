import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@demo/ui/src/components/ui/tabs'

import { TextGenerationView } from '@/components/project/text-generation'

type Props = {
  params: { projectId: string }
}
const ProjectIdPage = (props: Props) => {
  const { params } = props

  return (
    <div className="pt-6 pl-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">文字生成AI</h1>
          <span className="text-sm text-slate-700">
            下記の必要項目に記入し、確認を押し生成を開始しましょう。
          </span>
        </div>
      </div>
      <Tabs defaultValue="text-generation" className="pt-3">
        <TabsList>
          <TabsTrigger value="text-generation">プロット生成</TabsTrigger>
          <TabsTrigger value="data-registration">データ登録</TabsTrigger>
          <TabsTrigger value="idea-generation">ネタ提案</TabsTrigger>
        </TabsList>
        <TabsContent value="text-generation">
          <TextGenerationView />
        </TabsContent>
        <TabsContent value="data-registration">ダミーデータ</TabsContent>
        <TabsContent value="idea-generation">ダミーデータ</TabsContent>
      </Tabs>
    </div>
  )
}

export default ProjectIdPage
