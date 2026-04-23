import { getAssessments } from '@/actions/interview'
import React from 'react'
import StatsCards from './_components/stats-cards';
import PerformanceChart from './_components/performance-chart';
import QuizList from './_components/quiz-list';
import { redirect } from 'next/navigation';


const InterviewPage = async() => {

  const assessments = await getAssessments();
  if (!assessments || assessments.length === 0) {
    redirect('/interview/mock'); // replace with your actual page route
  }

  return (
    <div>
      <div className='space-y-6'>
        <h1 className='text-6xl font-bold gradient-title mb-5'>Interview Preparation</h1>
        <StatsCards assessments={assessments}/>
        <PerformanceChart assessments={assessments}/>
        <QuizList assessments={assessments}/>
        

      </div>
    </div>
  )
}

export default InterviewPage
