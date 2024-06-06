import { mdiAsterisk, mdiBallotOutline } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Buttons from '../../../components/Buttons'
import Divider from '../../../components/Divider'
import CardBox from '../../../components/CardBox'
import FormField from '../../../components/Form/Field'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import SectionMain from '../../../components/Section/Main'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import { useRouter } from 'next/router'
import classApi from '../../../api/class'
import Datepicker from 'react-tailwindcss-datepicker'
import ProtectedRoute from '../../../components/ProtectedRoute'
import { useAppSelector } from '../../../stores/hooks'
import { selectUser } from '../../../stores/userSlice'

const AddClass = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const selectedUser = useAppSelector(selectUser)
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })
  const route = useRouter()
  const handleSubmit = async (values) => {
    const { ok } = await classApi.createClass({
      ...values,
      startDate: value.startDate.startDate,
      endDate: value.endDate.endDate,
      departmentId: selectedUser.deparment.id,
    })
    if (ok) {
      setIsSuccess(true)
      route.push('/class')
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isSuccess) {
        setIsSuccess(false)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [isSuccess])

  const handleValueChange = (key: string, newValue) => {
    setValue((prev) => ({ ...prev, [key]: newValue }))
  }
  return (
    <ProtectedRoute roles={[2]}>
      <Head>
        <title>{getPageTitle('Add Class')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Add Class" main />

        <CardBox>
          <Formik
            initialValues={{
              name: '',
              courseName: '',
              numberOfSession: 1,
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                <FormField label="Class Name" labelFor="name">
                  <Field name="name" placeholder="Class Name" />
                </FormField>
                <FormField label="Course Name" labelFor="courseName">
                  <Field name="courseName" placeholder="Course Name" />
                </FormField>
                <FormField label="Start Date" labelFor="startDate">
                  <Datepicker
                    value={value.startDate}
                    onChange={(value) => handleValueChange('startDate', value)}
                    useRange={false}
                    asSingle={true}
                  />
                </FormField>
                <FormField label="End Date" labelFor="endDate">
                  <Datepicker
                    value={value.endDate}
                    onChange={(value) => handleValueChange('endDate', value)}
                    useRange={false}
                    asSingle={true}
                  />
                </FormField>
                <FormField label="Number of Session" labelFor="numberOfSession">
                  <Field name="numberOfSession" placeholder="Number of Session" />
                </FormField>
              </div>

              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Submit" />
                <Button type="reset" color="info" outline label="Reset" />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </ProtectedRoute>
  )
}

AddClass.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddClass
