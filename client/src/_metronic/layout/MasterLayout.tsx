import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AsideDefault } from './components/aside/AsideDefault'
import { HeaderWrapper } from './components/header/HeaderWrapper'
import { ScrollTop } from './components/ScrollTop'
import { Content } from './components/Content'
import { PageDataProvider } from './core'
import { ThemeModeProvider } from '../partials'
import { MenuComponent } from '../assets/ts/components'
import { useAuth } from '../../providers'

const MasterLayout = () => {
  const location = useLocation()
  const { hasRequiredRole } = useAuth()

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className='d-flex flex-column flex-root'>
          {hasRequiredRole(1) && <div className='super-line'>
            Super Admin
          </div>}
          <div className='page d-flex flex-row flex-column-fluid'>
            <AsideDefault />
            <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
              <HeaderWrapper />
              <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
                <Content>
                  <Outlet />
                </Content>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export { MasterLayout }
