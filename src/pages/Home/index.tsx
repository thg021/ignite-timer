import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import * as zod from 'zod'
import { CycleContext } from '../../contexts/CyclesContext'
import { useContext } from 'react'

const newCycleFormValidations = zod.object({
  task: zod.string().min(1, 'Informe a tarefa.'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ser no minimo 5 minutos.')
    .max(60, 'O ciclo deve ser no máximo 60 minutos.'),
})

// interface INewCycleFormDate {
//   task: string
//   minutesAmount: number
// }

type TNewCycleFormDate = zod.infer<typeof newCycleFormValidations>

export function Home() {
  const { activeCycle, createNewCycle, InterrruptCurrentCycle } =
    useContext(CycleContext)
  const newCycleForm = useForm<TNewCycleFormDate>({
    resolver: zodResolver(newCycleFormValidations),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: TNewCycleFormDate) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountDownButton onClick={InterrruptCurrentCycle} type="button">
            <HandPalm size={24} /> Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} /> Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
