import { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View, FlatList, Dimensions, Animated } from 'react-native'

const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fed',
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
    width: width * 0.95,
    backgroundColor: '#fff',
    marginTop: 8,
    borderRadius: 6,
  },
  buttons: {
    flex: 0.1,
    flexDirection: 'row',
    height: height * 0.001,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    bottom: 8,
    borderRadius: 5,
    backgroundColor: '#bae',
  },
  btnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 30,
  },
})

type entry = {
  key: string
}

export default function TabTwoScreen() {
  const [data, setData] = useState([{ key: 'Devin' }])
  const bufferData = [
    { key: 'Dan' },
    { key: 'Dominic' },
    { key: 'Jackson' },
    { key: 'James' },
    { key: 'Joel' },
    { key: 'John' },
    { key: 'Jillian' },
    { key: 'Jim' },
  ]

  /**
   * todo: a random idx generator function that returns a value between [0, len(bufferArray))
   */
  const generateRandomIdx = (array: Array<entry>) => {
    const bufferLength = array.length
    return Math.floor(Math.random() * bufferLength)
  }
  const addEntryAtRandomIdx = () => {
    /**
     * pick a random entry from buffer data, for picking a random entry, generate a random idx ranging from
     * [0,bufferData.length-1]
     * Math.random returns a number between 0 and 1, inclusive of zero but not 1
     * so, if we multiply both sides with the length of buffer array, we get a number between [0, length of array)
     * now take the absolute value of this number as the random index
     * then use array.splice method to insert element at that index in the buffer array into the state data
     */
    const idx = generateRandomIdx(bufferData)
    const idx1 = generateRandomIdx(data)
    const item = bufferData[idx]
    console.log(idx)
    setData(prev => {
      const left = prev.slice(0, idx1)
      const right = prev.slice(idx1)
      return [...left, item, ...right]
    })
  }

  /**
   * remove a random entry from tail end of the data array, then call setState with new array
   * 
   */
  const popEntry = () => {
    setData(prev => {
      return prev.slice(0, prev.length - 1)
    })
  }
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 8 }}
        keyExtractor={(key, idx) => 'key' + idx}
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.item]}>
            <Text style={styles.title}>{item.key}</Text>
          </View>
        )}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={addEntryAtRandomIdx}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={popEntry}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
