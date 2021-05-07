import Layout from '../../components/Layout'
import { ApiUrl } from '../_app'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

export default function EditDisease() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<Disease>({
    id: 0,
    name: '',
    picture: '',
    patient_id: '',
    patient_name: '',
    patient_age: '',
  })

  useEffect(() => {
    if (router.isReady) {
      const fetchData = async () => {
        const res = await fetch(`${ApiUrl}/diseases/${router.query.id}`)
        setState(await res.json())
        setLoading(false)
      }
      fetchData()
    }
  }, [router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await fetch(`${ApiUrl}/diseases/${state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(state),
    })
    router.push('/')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prevProps) => ({
      ...prevProps,
      [e.target.name]: e.target.value,
    }))
  }

  if (loading) return <div>Loading...</div>

  return (
    <Layout title="Edit Disease">
      <div>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Edit Disease
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Edit current disease
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <form onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="grid grid-cols-3 gap-6">
                              <div className="col-span-3 sm:col-span-2">
                                <label
                                  htmlFor="name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Name
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                    placeholder="Name"
                                    value={state.name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>

                              <div className="col-span-3 sm:col-span-2">
                                <label
                                  htmlFor="picture"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Picture
                                </label>
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                  id="picture"
                                  name="picture"
                                  type="text"
                                  placeholder="picture"
                                  value={state.picture}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="col-span-3 sm:col-span-2">
                                <label
                                  htmlFor="patient_name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Patient Name
                                </label>
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                  id="patient_name"
                                  name="patient_name"
                                  type="text"
                                  placeholder="Patient Name"
                                  value={state.patient_name}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="col-span-3 sm:col-span-2">
                                {' '}
                                <label
                                  htmlFor="patient_age"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Patient Age
                                </label>
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                  id="patient_age"
                                  name="patient_age"
                                  type="text"
                                  placeholder="Patient Age"
                                  value={state.patient_age}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                              type="submit"
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
