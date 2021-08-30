import Head from 'next/head'
import indexStyles from '../styles/Index.module.css'
import Link from 'next/link'

export default function Home() {
  const handleSubmit = () => {
      console.log('hiiii')
    }
  return (
    <>
      <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <div className={indexStyles['index-container']}>
        <h1>ZOOM <i className="far fa-comment-dots"></i> SLACK</h1>
        <div className={indexStyles['index-form-container']}>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor=""></label>
                <input type="text" name='body' placeholder='Enter a name...' />
                <button type="submit">
                    <i className="far fa-paper-plane"></i>
                </button>
            </form>
        </div>
        <Link href='/rooms'>Enter</Link>
      </div>
    </>
  )
}
