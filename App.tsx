import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react'
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required')
})

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digitChars = '0123456789'
    const specialChars = '!@#$%^&*()_+'
    
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }



    let passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex);
    }

    return result;
  }

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false)
    setLowerCase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);

  }


  return (
    <ScrollView keyboardShouldPersistTaps="handled" >
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values)
              generatePasswordString(Number(values.passwordLength));
            }
            }
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              isValid,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              
              <>
                <View style={styles.inputWrapper}>

                  <View style={styles.inputColumn}>
                    <View>

                    <Text style={styles.heading}>Password Length</Text>
                    { errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder='Ex. 8'
                      keyboardType='numeric'
                    />

                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowerCase</Text>
                  <BouncyCheckbox
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor='#29AB87'
                  />

                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include upperCase</Text>
                  <BouncyCheckbox
                    isChecked={upperCase}
                    onPress={() => setUppercase(!upperCase)}
                    fillColor='#C9A0DC'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor='#FC80A5'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor='#FED85D'
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity disabled={!isValid} onPress={handleSubmit}><Text style={styles.button}>Generate Password</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    handleReset();
                    resetPasswordState();
                  }}><Text style={styles.button}>Reset Password</Text></TouchableOpacity>
                </View>
              </>
            )}
          </Formik>

        </View>
        {isPasswordGenerated ? (
           <View style={styles.card}>
            <Text style={styles.resultHeading}>Result :</Text>
            <Text style={styles.resultDescription}>Long Press to Copy</Text>
            <Text selectable style={styles.passwordText}>{password}</Text>
           </View>
        ) : null
        }
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  heading: {
    fontSize:17,
    fontWeight:'bold',
    color:"white"
  },
  errorText: {
    color: "#FC80A5",
  },
  container: {
    // height:550,
    paddingHorizontal:15,
    paddingVertical:15
  },
  formContainer: {
    flexDirection: 'column',
    alignItems:'center',
    
  },
  title: {
    fontSize: 28,
    color:"white"
  },
  inputWrapper: {
    flexDirection:'row',
    justifyContent:'space-between',
    width:330,
    marginVertical:15
  },
  inputColumn: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:330,
    marginVertical:28
  },
  inputStyle: {
    borderColor:'white',
    borderWidth: 2,
    width:100,
    paddingLeft: 10
  },
  formActions: {
    flexDirection:'row',
    justifyContent:'space-between',
    width:330,
    marginVertical:28
  },
  button:{
    backgroundColor:'white',
    paddingHorizontal:20,
    paddingVertical:20,
    color:'black',
    fontWeight:'bold',
    fontSize:15,
    borderRadius:10
  },
  card:{
    // height:300,
    backgroundColor:"white",
    marginHorizontal: 10,
    marginVertical:10,
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:10
  },
  resultHeading:{
    fontSize:25,
    color:"black",
    marginVertical:10
  },
  resultDescription:{
    color:"black",
  },
  passwordText:{
    color:"black",
    fontSize:40,
    paddingHorizontal:60,
    marginBottom:20
  }
})