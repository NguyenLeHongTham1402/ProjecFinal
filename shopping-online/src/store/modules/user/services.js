import axios from "axios"
import { getAPICloudinary, getAPIUserOrder } from "@/helpers/getApiUrl"

const API_CLOUDINARY = getAPICloudinary()
const API_USER = getAPIUserOrder('User')

export const UploadFile = async (files) => {
  try {
    const value = {
      file: files[0],
      upload_preset: 'riwlxl1t',
      api_key: '919543544232649'
    }
    console.log(value)
    const response = await axios.post(API_CLOUDINARY, value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch {
    return {}
  }

}

export const CheckUserExists = async (user) => {
  try {
    const response = await axios.get(`${API_USER}?username=${user.username}`)
    return response.data.length > 0
  } catch {
    return false
  }

}

export const CheckLogin = async (user) => {
  try {
    const response = await axios.get(`${API_USER}?username=${user.username}`)
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].password == user.password && response.data[i].username == user.username) {
        localStorage.setItem('current-user', JSON.stringify(response.data[i]))
        return response.data[i]
      }
    }
    return {}
  } catch {
    return {}
  }
}

export const addUser = async (user) => {
  try {
    const response = await axios.post(API_USER, user)
    return response.data
  } catch {
    return {}
  }
}

export const updateUser = async (user) => {
  try {
    const response = await axios.put(`${API_USER}/${user.id}`, user)
    return response.data
  } catch {
    return {}
  }
}

export const getUsers = async() => {
  let result = []
  await axios.get(
      API_USER
  ).then(response => {
      let users = response.data.filter(x=>x.isActive==true)
      result.push(users)
  })
  return result[0]
}

export const getUsersById = async(id) => {
  let result = []
  await axios.get(
      `${API_USER}/${id}`
  ).then(response => {
      let users = response.data
      result.push(users)
  })
  return result[0]
}