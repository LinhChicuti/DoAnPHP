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
import { useAppDispatch } from '../../../stores/hooks'
import { CreateDepartmentRequest } from '../../../models/department'
import departmentApi from '../../../api/department'
import { setUpdateDepartmentResult } from '../../../stores/departmentSlice'
import NotificationBar from '../../../components/NotificationBar'
import { useRouter } from 'next/router'

const AddDepartment = () => {
  const dispatch = useAppDispatch()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const route = useRouter()

  const handleSubmit = async (values: CreateDepartmentRequest) => {
    const { ok } = await departmentApi.createDepartment(values)
    if (ok) {
      setIsSuccess(true)
      dispatch(setUpdateDepartmentResult())
      route.push('/departments')
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
        <title>{getPageTitle('Add Department')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Add Department" main />
        {isSuccess && (
          <NotificationBar color="success" icon={mdiCheckAll} onClose={() => setIsSuccess(false)}>
            Add Department Success
          </NotificationBar>
        )}
        <CardBox>
          <Formik
            initialValues={{
              name: '',
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormField label="Deparment Name" labelFor="name">
                <Field name="name" placeholder="Deparment Name" />
              </FormField>

              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Submit" />
                <Button type="reset" color="info" outline label="Reset" />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

AddDepartment.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddDepartment
