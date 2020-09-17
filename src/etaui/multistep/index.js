//  https://xlog.x-hub.io/advanced-react-patterns-compound-components-with-hooks/
import React, { useState, useContext, memo } from 'react'
import styled from 'styled-components/native'
import {ETASimpleText} from '@etaui'

const Root = styled.View`
	flex: 1;
`
const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;    
`
const ButtonContainer = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
`
const ActionButton = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
    min-height: 20px;
    min-width: 100%;
    padding: 10px;
`

const MultiStepContext = React.createContext();

const useStepContext = () => {
  const context = useContext(MultiStepContext);

  if (!context) {
    throw new Error('MultiStepContext used outside ETAMultiStep Compound Components');
  }

  return context;
}

const ETAMultiStep = memo(({ children }) => {
    const [index, setindex] = useState(0)
    
    const _nextStep = () => {
          if (index !== children.length - 1) {
          //     // setindex(prevState => {
          //     //     return new Map(prevState).set(prevState.index + 1)
          //     //     // index: prevState.index + 1,
          //     // });
          //     setindex(prevState => {
          //         return {...prevState.index + 1}
          //     })
  
          setindex(index + 1)
          }
      };
  
      const _prevStep = () => {
          if (index !== 0) {
              // setindex(prevState => {
              //     return new Map(prevState).set(prevState.index - 1)
              //     // index: prevState.index - 1,
              // });
              setindex(index - 1)
          }
      };
  
    return (
      <MultiStepContext.Provider value={{ index, setindex }}>
          <Root>
              {
                  React.Children.map(children, (element, i) => {
                      if (i === index) {
                          return React.cloneElement(element, {
                              itemsLength: children.length,
                              currentIndex: index,
                              nextStep: _nextStep,
                              prevStep: _prevStep,
                              isLast: index === children.length - 1,
                          })
                      }
  
                      return null;
                  })
              }
          </Root>
      </MultiStepContext.Provider>
    );
})

const Step = (props) => {
    const { index, setindex } = useStepContext()

    return (
        <Root>
            {props.children}
            <ButtonsContainer>                    
                <ButtonContainer>
                    <ActionButton
                        onPress={props.prevStep}
                        disabled={props.currentIndex === 0}
                        style={{ backgroundColor: props.currentIndex === 0 ? 'transparent' : '#333333' }}>
                        <ETASimpleText
                            size={14}
                            weight={
                                Platform.OS === 'ios'
                                    ? '400'
                                    : '300'
                            }
                            color={props.currentIndex === 0 ? '#444' : 'white'}
                            align='center'>
                            Previous
                        </ETASimpleText>
                    </ActionButton>
                </ButtonContainer>
                
                <ButtonContainer>
                    <ActionButton
                        onPress={props.nextStep}
                        disabled={props.isLast}
                        style={{ backgroundColor: props.isLast ? 'transparent' : '#333333' }}>
                        <ETASimpleText
                            size={14}
                            weight={
                                Platform.OS === 'ios'
                                    ? '400'
                                    : '300'
                            }
                            color={props.isLast ? '#444' : 'white'}
                            align='center'>
                            Next
                        </ETASimpleText>
                    </ActionButton>
                </ButtonContainer>
            </ButtonsContainer>
        </Root>
    )
}

ETAMultiStep.Step = Step

export default ETAMultiStep