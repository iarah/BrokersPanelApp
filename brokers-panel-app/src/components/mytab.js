import React, { useState, createContext, useContext } from 'react';
import { Box } from '@oneloop/jopijs'

const TabsContext = createContext();

export const Tabs = ({ children, ...props }) => {
  const [active, setActive] = useState()
  const value = React.useMemo(() => ({ active, setActive }), [active])
  return (
    <TabsContext.Provider value={value} >
    <div>
      {/* <Box {...props} __css={{ display: 'inline-flex' }}> */}
      <Box {...props} __css={{ textAlign: 'center'}}>
        {children}
      </Box>
      </div>
    </TabsContext.Provider>
  )
}


const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error(
      'Tabs compound components cannot be rendered outside the Tabs component'
    )
  }
  return context
}


const Tab = ({ id, children, ...props }) => {
  const { active, setActive } = useTabsContext()
  return (
    <Box
      onClick={() => setActive(id)}
      {...props}
      __css={{
        display: 'inline-flex',
        padding: 'auto 38px',
        position: 'relative',
        cursor: 'pointer',
        fontFamily: 'heading',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 1,
        '*': {
          textDecoration: 'none',
          color: active === id ? 'white' : '#EBA49A',
        },
        a: {
          display: 'block',
          width: '148px',
          height: '52px',
          lineHeight: '52px',
        },
        'a > *:first-child': {
          marginRight: '10px',
        },
      }}
    >
      {children}
      {active === id && 
      (
        <Box
          as="span"
          __css={{
            borderRadius: '4px 4px 0 0',
            display: 'block',
            backgroundColor: 'white',
            height: '4px',
            position: 'absolute',
            right: '10px',
            left: '10px',
            bottom: 0,
          }}
        />
      )}
    </Box>
  )
}

const Content = ({id, children, ...props}) => {
  const { active, setActive } = useTabsContext()
  return (
    active === id &&
    <Box {...props}>
      {children}
    </Box>);
}

Tabs.Tab = Tab
Tabs.Content = Content
