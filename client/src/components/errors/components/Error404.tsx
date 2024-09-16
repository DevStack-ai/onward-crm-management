import { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toAbsoluteUrl } from 'metronic/helpers'

const Error404: FC = () => {

  const navigate = useNavigate()

  useEffect(() => {

    navigate('/dashboard')
  }, [navigate])

  return (
    <>
      {/* begin::Title */}
      <h1 className='fw-bolder fs-2hx text-gray-900 mb-4'>Oops!</h1>
      {/* end::Title */}

      {/* begin::Text */}
      <div className='fw-semibold fs-6 text-gray-500 mb-7'>Parece que te has perdido.</div>
      {/* end::Text */}

      {/* begin::Illustration */}
      <div className='mb-3'>
        <img
          src={toAbsoluteUrl('/media/auth/404-error.png')}
          className='mw-100 mh-300px theme-light-show'
          alt=''
        />
        <img
          src={toAbsoluteUrl('/media/auth/404-error-dark.png')}
          className='mw-100 mh-300px theme-dark-show'
          alt=''
        />
      </div>
      {/* end::Illustration */}

      {/* begin::Link */}
      <div className='mb-0'>
        <Link to='/dashboard' className='btn btn-sm btn-primary'>
          Regresar
        </Link>
      </div>
      {/* end::Link */}
    </>
  )
}

export { Error404 }
