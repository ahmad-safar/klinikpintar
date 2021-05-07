import Layout from '../components/Layout'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { ApiUrl } from './_app'

export const fetcher = (url: string) =>
  fetch(`${ApiUrl}${url}`).then((r) => r.json())

export const Home = () => {
  const { data, error } = useSWR<Disease[]>(`/diseases`, fetcher)

  if (error) return <div>failed to load</div>

  async function deleteDisease(id: number) {
    if (confirm('Are you sure to delete this disease?')) {
      await fetch(`${ApiUrl}/diseases/` + id, { method: 'DELETE' })
      mutate('/diseases')
    }
  }

  return (
    <Layout title="Klinik Pintar Test">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Picture
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Patient Name
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {!data ? (
                        <tr>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-center"
                            colSpan={4}
                          >
                            Loading...
                          </td>
                        </tr>
                      ) : data.length == 0 ? (
                        <tr>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-center"
                            colSpan={4}
                          >
                            Data not found
                          </td>
                        </tr>
                      ) : (
                        data.map((disease) => (
                          <tr key={disease.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {disease.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {disease.picture}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {disease.patient_name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {disease.patient_age} years old
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a className="text-indigo-600 hover:text-indigo-900">
                                <Link href={`/edit/${disease.id}`}>Edit</Link>
                              </a>{' '}
                              |{' '}
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => {
                                  deleteDisease(disease.id)
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
