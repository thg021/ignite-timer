import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

const newCycleFormValidations = zod.object({
  task: zod.string().min(1, 'Informe a tarefa.'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo deve ser no minimo 5 minutos.')
    .max(60, 'O ciclo deve ser no máximo 60 minutos.'),
})

// interface INewCycleFormDate {
//   task: string
//   minutesAmount: number
// }

type TNewCycleFormDate = zod.infer<typeof newCycleFormValidations>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<TNewCycleFormDate>({
    resolver: zodResolver(newCycleFormValidations),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  function handleCreateNewCycle(data: TNewCycleFormDate) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em: </label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="list-suggestion"
            {...register('task')}
          />

          <datalist id="list-suggestion">
            <option value="Projeto 1" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            placeholder="00"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountDownContainer>
        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} /> Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
