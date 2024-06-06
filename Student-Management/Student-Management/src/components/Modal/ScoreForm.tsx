import { mdiAsterisk, mdiBallotOutline, mdiClose } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
import FormField from '../../components/Form/Field'
import LayoutAuthenticated from '../../layouts/Authenticated'
import OverlayLayer from '../OverlayLayer'
import CardBoxComponentTitle from '../CardBox/Component/Title'
import Datepicker, { DateRangeType } from 'react-tailwindcss-datepicker'
import { SessionReponse } from '../../models/session'
import sessionApi from '../../api/session'
import { useRouter } from 'next/router'
import { formatDate, formatDateV2 } from '../../utils/dateUtil'
import { StudentClassResponse } from '../../models/class'
import classApi from '../../api/class'

interface ScoreFormProps {
  isActive: boolean
  session?: StudentClassResponse
  onClose: () => void
  title: string
  onRefresh: () => void
}

const ScoreForm = ({ session, isActive, onClose, title, onRefresh }: ScoreFormProps) => {
  const router = useRouter()

  if (!isActive) {
    return null
  }

  const handleSubmit = useCallback(
    async (values: { score: number }) => {
      const { ok } = await classApi.updateScore(values.score, session.id)
      if (ok) {
        onClose()
        onRefresh()
      }
    },

    [session]
  )

  return (
    <OverlayLayer onClick={onClose} className={onClose ? 'cursor-pointer' : ''}>
      <CardBox
        className={`transition-transform shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-4/5 xl:w-8/12 z-50`}
        isModal
      >
        <CardBoxComponentTitle title={title}>
          {!!onClose && (
            <Button icon={mdiClose} color="whiteDark" onClick={onClose} small roundedFull />
          )}
        </CardBoxComponentTitle>

        <div className="space-y-3">
          <Formik
            initialValues={{
              score: session.score,
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormField label="Score" labelFor="score">
                <Field name="score" placeholder="Score" />
              </FormField>
              <Divider />
              <Buttons>
                <Button type="submit" color="info" label="Submit" />
                <Button type="reset" color="info" outline label="Reset" />
              </Buttons>
            </Form>
          </Formik>
        </div>
      </CardBox>
    </OverlayLayer>
  )
}

ScoreForm.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ScoreForm
