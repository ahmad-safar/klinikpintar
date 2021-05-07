import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

export const ApiUrl = process.env.NEXT_PUBLIC_API_URL

export const fetcher = (url: string) =>
  fetch(`${ApiUrl}${url}`).then((r) => r.json())

export const Home = () => {
  const { data, error } = useSWR<Disease[]>(`/diseases`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  async function deleteDisease(id: number) {
    await fetch(`${ApiUrl}/diseases/` + id, { method: 'DELETE' })
    useSWR<Disease[]>(`/diseases`, fetcher)
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Diseases</h1>

        <div>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Picture</td>
                <td>Patient Name</td>
                <td>Patient Age</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {data.map((disease) => (
                <tr key={disease.id}>
                  <td>{disease.name}</td>
                  <td>{disease.picture}</td>
                  <td>{disease.patient_name}</td>
                  <td>{disease.patient_age}</td>
                  <td>
                    <Link href={`/edit/${disease.patient_id}`}>Edit</Link> |
                    <button
                      onClick={async () => {
                        await deleteDisease(disease.id)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Home
