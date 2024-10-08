'use client'

import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { generateTextOutput } from '@demo/lib/utils/helper'
import { TextGenerationSchema } from '@demo/lib/schemas/text-generation'

import { Input } from '@demo/ui/src/components/ui/input'
import { Button } from '@demo/ui/src/components/ui/button'
import { Textarea } from '@demo/ui/src/components/ui/textarea'
import {
  RadioGroup,
  RadioGroupItem,
} from '@demo/ui/src/components/ui/radio-group'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@demo/ui/src/components/ui/form'

export const TextGenerationView = () => {
  const [textOutput, setTextOutput] = useState<string | undefined>(undefined)

  const form = useForm<z.infer<typeof TextGenerationSchema>>({
    resolver: zodResolver(TextGenerationSchema),
    defaultValues: {
      refUrl: '',
      llm: 'gpt-4o',
    },
  })

  const onSubmit = (data: z.infer<typeof TextGenerationSchema>) => {
    console.log(data)
    generateTextOutput((result) => {
      setTextOutput(result)
    })
    // form.reset()

    return
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 pt-2"
          >
            <FormField
              control={form.control}
              name="instruction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    生成指示：作りたいプロットのイメージを入力
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="生成指示を入力する"
                      className="resize-none h-40 bg-zinc-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="refUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>参考URL</FormLabel>
                  <FormControl>
                    <Input placeholder="" className="bg-zinc-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="llm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LLMの選択</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue="gpt-4o"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="gpt-4o" />
                        </FormControl>
                        <FormLabel className="font-normal">GPT-4o</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="claude3" />
                        </FormControl>
                        <FormLabel className="font-normal">Claude3</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">送信</Button>
          </form>
        </Form>
      </div>

      <>
        <div className="space-y-3 pt-2">
          <div className="flex items-center">
            <span className="text-sm">生成結果</span>
          </div>
          <Textarea
            value={textOutput}
            placeholder="生成結果：プロットが表示されます。"
            className="resize-none h-40 bg-zinc-50"
          />
        </div>
      </>
    </div>
  )
}
