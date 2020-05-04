import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';

const TextInputContainer = styled.View`
    backgroundColor: transparent;
    marginVertical: 5px;
    marginHorizontal: 5px;
    paddingHorizontal: 5px;
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
    alignSelf: center;
    alignContent: center;
    paddingHorizontal: 25px; 
    borderWidth: 0.7px;
    borderColor: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
    borderRadius: 3px;
`;
const TextInput = styled.TextInput.attrs({
})`
    width: ${props => props.width ? props.width : 300}px;
    height: ${props => props.height ? props.height : 40}px;
    fontSize: ${props => props.textsize ? props.textsize : 14}px;
    color: black;
    margin: 5px;
    justifyContent: center;
    alignItems: center;
    alignSelf: center;
    alignContent: center;
`;

const ETATextInputOutLine = ({
    rightIcon,
    value,
    placeholder,
    placeholderTextColor,
    keyboardType,
    autoCapitalize,
    allowFontScaling,
    autoCorrect,
    autofocus,
    bluronsubmit,
    caretHidden,
    clearButtonMode,
    contextMenuHidden,
    editable,
    enablesReturnKeyAutomatically,
    keyboardAppearance,
    maxLength,
    multiline,
    numberoflines,
    returnkeylabel,
    secureTextEntry,
    selectionColor,
    spellcheck,
    textContentType,
    returnkeytype,
    textAlign,
    textsize,
    height,
    width,
    onChangeText,
    paddingHorizontal
 }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <>
            <TextInputContainer
                style={{ width: width, height: height }}>
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'rgba(0, 255, 0, 1)'}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    allowFontScaling={allowFontScaling}
                    autoCorrect={autoCorrect}
                    autoFocus={autofocus}
                    blurOnSubmit={false}
                    caretHidden={caretHidden}
                    clearButtonMode={clearButtonMode}
                    contextMenuHidden={contextMenuHidden}
                    editable={editable}
                    enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
                    // underlineColorAndroid='transparent'
                    keyboardAppearance={keyboardAppearance}
                    maxLength={maxLength}
                    multiline={multiline}
                    numberOfLines={numberoflines} //android
                    returnKeyLabel={returnkeylabel} //android
                    secureTextEntry={secureTextEntry} //password
                    selectionColor='red'
                    spellCheck={spellcheck}
                    textContentType={textContentType}
                    returnKeyType={returnkeytype}
                    textsize={textsize}
                    height={height}
                    width={width}
                    // selection='1, 4'//? no sé we xd
                    // onBlur={text => this._onBlur(text)}
                    onChangeText={onChangeText}
                    // onEndEditing={text => this._onEndEditing(text)}
                    // onFocus={text => this._onFocus(text)}
                    // ref={(input) => {this.emailInput = input }}
                    // onKeyPress={}
                    // onScroll={}
                    paddingHorizontal={paddingHorizontal ? paddingHorizontal : 15}
                    />
                    {
                        rightIcon
                    }
            </TextInputContainer>
        </>
    );
}

export default ETATextInputOutLine;
/*  Notes
autoCapitalize enum:('none', 'sentences', 'words', 'characters')

keyboardType enum:('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 
                'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password')

textContentType enum:('none', 'URL', 'addressCity', 'addressCityAndState', 'addressState', 'countryName', 'creditCardNumber', 
'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 
'nameSuffix', 'nickname', 'organizationName', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 
'telephoneNumber', 'username', 'password')

returnKeyType enum:('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 
                    'google', 'join', 'route', 'yahoo')
clearButtonMode enum:('never', 'while-editing', 'unless-editing', 'always')
secureTextEntry boolean: default false
*/