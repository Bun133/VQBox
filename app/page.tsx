"use client"

import { api } from "@/convex/_generated/api";
import { Box, HStack } from "@chakra-ui/react";
import { useQuery } from "convex/react";

export default function Page({}){
  const questions = useQuery(api.question.listAllQuestion, {});


  return (
    <HStack>
      {questions?.map((q) => {
        return <Box key={q._id.toString()} bg="blue.100">{q.text}</Box>
      })}
      <Box bg="bg.emphasized">テストでございますよ</Box>
      <Box bg="red.100">テストでございますよ</Box>
      <Box bg="red.100">テストでございますよ</Box>
    </HStack>
  )
}