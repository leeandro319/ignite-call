import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/router'

const claimUserNameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Digite um usuário válido' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Digite um usuário válido' })
    .transform((value) => value.toLowerCase()),
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export function ClaimUserNameForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormSchema),
  })

  async function handleClaimUserName(data: ClaimUserNameFormData) {
    const { username } = data
    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUserName)}>
        <TextInput
          size={'sm'}
          prefix="ignite.com/"
          placeholder="Seu usuário"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
          {...register('username')}
        />
        <Button type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size={'sm'}>
          {errors.username ? errors.username?.message : 'Digite o nome'}
        </Text>
      </FormAnnotation>
    </>
  )
}
