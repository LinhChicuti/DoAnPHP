import { mdiAsterisk, mdiBallotOutline, mdiCheckAll } from '@mdi/js'
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
import { useAppSelector } from '../../../stores/hooks'
import { selectDepartments } from '../../../stores/departmentSlice'
import { CreateUserRequest } from '../../../models/auth'
import lecturesApi from '../../../api/lectures'
import { useRouter } from 'next/router'
import NotificationBar from '../../../components/NotificationBar'

const AddLecture = () => {
  const selectedDepartment = useAppSelector(selectDepartments)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const route = useRouter()

  const handleSubmit = async (values: CreateUserRequest) => {
    const { ok } = await lecturesApi.createLecture(values)
    if (ok) {
      setIsSuccess(true)
      route.push('/lectures')
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

  return (
    <>
      <Head>
        <title>{getPageTitle('Add Lecture')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Add Lecture" main />
        {isSuccess && (
          <NotificationBar color="success" icon={mdiCheckAll} onClose={() => setIsSuccess(false)}>
            Add Lectures Success
          </NotificationBar>
        )}
        {selectedDepartment && (
          <CardBox>
            <Formik
              initialValues={{
                name: '',
                email: '',
                address: '',
                gender: 'Male',
                username: '',
                password: '',
                departmentId: selectedDepartment[0]?.id,
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                  <FormField label="Full Name" labelFor="name">
                    <Field name="name" placeholder="Full name" />
                  </FormField>
                  <FormField label="Email" labelFor="email">
                    <Field type="email" name="email" placeholder="Email" />
                  </FormField>
                  <FormField label="Address" labelFor="address">
                    <Field name="address" placeholder="Address" />
                  </FormField>
                  <FormField label="Gender" labelFor="gender">
                    <Field name="gender" id="gender" component="select">
                      <option value="Male">Male</option>
                      <option value="Female">FeMale</option>
                    </Field>
                  </FormField>
                </div>
                <Divider />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                  <FormField label="Username" labelFor="username">
                    <Field name="username" placeholder="username" />
                  </FormField>
                  <FormField label="Department" labelFor="department">
                    <Field name="departmentId" id="departmentId" component="select">
                      {selectedDepartment &&
                        selectedDepartment.map((department) => (
                          <option value={department.id} key={department.id}>
                            {department.name}
                          </option>
                        ))}
                    </Field>
                  </FormField>
                  <FormField
                    label="Password"
                    help="Required. Your current password"
                    labelFor="password"
                    icons={[mdiAsterisk]}
                  >
                    <Field name="password" id="password" type="password" autoComplete="password" />
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
        )}
      </SectionMain>
    </>
  )
}

AddLecture.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddLecture
