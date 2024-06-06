import { mdiAsterisk, mdiBallotOutline, mdiClose } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
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

interface SessionFormProps {
  isActive: boolean
  session?: SessionReponse
  onClose: () => void
  title: string
  onRefresh: () => void
}

const SessionForm = ({ session, isActive, onClose, title, onRefresh }: SessionFormProps) => {
  const router = useRouter()
  const [value, setValue] = useState(
    session
      ? { endDate: formatDateV2(session.sessionDate), startDate: formatDateV2(session.sessionDate) }
      : {
          startDate: null,
          endDate: null,
        }
  )

  if (!isActive) {
    return null
  }

  const handleSubmit = async (values: { sessionLocation: string }) => {
    if (session) {
      const { ok } = await sessionApi.updateSession(session.id, {
        sessionLocation: values.sessionLocation,
        sessionDate: value.startDate,
        classId: Number(router.query.slug),
      })
      if (ok) {
        onRefresh()
        onClose()
      }
    } else {
      const { ok } = await sessionApi.createSession({
        sessionLocation: values.sessionLocation,
        sessionDate: value.startDate,
        classId: Number(router.query.slug),
      })
      if (ok) {
        onRefresh()
        onClose()
      }
    }
  }

  const handleValueChange = (newValue) => {
    setValue(newValue)
  }

  // useEffect(() => {
  //   if (session !== null) {
  //     setValue({
  //       endDate: formatDateV2(session.sessionDate),
  //       startDate: formatDateV2(session.sessionDate),
  //     })
  //   }
  //   return () =>
  //     setValue({
  //       endDate: null,
  //       startDate: null,
  //     })
  // }, [session])

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
          {
            <Formik
              initialValues={
                session
                  ? { sessionLocation: session.sessionLocation }
                  : {
                      sessionLocation: '',
                    }
              }
              onSubmit={handleSubmit}
            >
              <Form>
                <FormField label="Session Location" labelFor="sessionLocation">
                  <Field name="sessionLocation" placeholder="Session Location" />
                </FormField>
                <FormField label="Session Date" labelFor="sessionDate">
                  <Datepicker
                    value={value}
                    onChange={handleValueChange}
                    useRange={false}
                    asSingle={true}
                  />
                </FormField>
                <Divider />

                <Buttons>
                  <Button type="submit" color="info" label="Submit" />
                  <Button type="reset" color="info" outline label="Reset" />
                </Buttons>
              </Form>
            </Formik>
          }
        </div>
      </CardBox>
    </OverlayLayer>
  )
}

SessionForm.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default SessionForm
