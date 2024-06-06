import { mdiAccount, mdiBallotOutline, mdiCheckAll, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
import FormField from '../../components/Form/Field'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import { useRouter } from 'next/router'
import { UserResponse } from '../../models/auth'
import lecturesApi from '../../api/lectures'
import { useAppSelector } from '../../stores/hooks'
import { selectDepartments } from '../../stores/departmentSlice'
import NotificationBar from '../../components/NotificationBar'
import authApi from '../../api/auth'

const LectureDetail = () => {
  const router = useRouter()
  const [lecture, setLecture] = useState<UserResponse | null>(null)
  const selectedDepartment = useAppSelector(selectDepartments)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const getLecture = useCallback(async () => {
    const { ok, body } = await lecturesApi.getLecturesById(Number(router.query.slug))
    if (ok && body) {
      setLecture(body)
    }
  }, [router.query.slug])

  const handleSubmit = async (values) => {
    const { ok } = await authApi.updateUser(Number(lecture.user.accountId), {
      ...values,
      isStudent: 0,
    })
    if (ok) {
      setIsSuccess(true)
      getLecture()
    }
  }

  useEffect(() => {
    getLecture()
  }, [getLecture])

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
        <title>{getPageTitle('Edit Lecture')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Edit Lecture" main />
        {isSuccess && (
          <NotificationBar color="success" icon={mdiCheckAll} onClose={() => setIsSuccess(false)}>
            Update Lecture Success
          </NotificationBar>
        )}

        <CardBox>
          {lecture && (
            <Formik
              initialValues={{
                name: lecture.user.name,
                address: lecture.user.address,
                gender: lecture.user.gender,
                departmentId: lecture.department.id,
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                  <FormField label="Full Name" labelFor="name">
                    <Field name="name" placeholder="Full name" />
                  </FormField>
                  <FormField label="Department" labelFor="departmentId">
                    <Field name="departmentId" id="departmentId" component="select">
                      {selectedDepartment &&
                        selectedDepartment.map((department) => (
                          <option value={department.id} key={department.id}>
                            {department.name}
                          </option>
                        ))}
                    </Field>
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

                <Buttons>
                  <Button type="submit" color="info" label="Submit" />
                  <Button type="reset" color="info" outline label="Reset" />
                </Buttons>
              </Form>
            </Formik>
          )}
        </CardBox>
      </SectionMain>
    </>
  )
}

LectureDetail.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default LectureDetail
