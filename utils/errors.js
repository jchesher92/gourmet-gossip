import mongoose from 'mongoose'

// Custom classes
// All custom classes are going to extend the native ErrorConstructor in order to throw error into a catch with a message
class CustomError extends Error {
  constructor(message, details) {
    super(message)
    this.details = details
  }
}

export class UnprocessableEntity extends CustomError {
  constructor(message, details) {
    super(message, details)
    this.name = 'UnprocessableEntity'
    this.status = 422
  }
}

export class NotBound extends CustomError {
  constructor(message, details) {
    super(message, details)
    this.name = 'NotFound'
    this.status = 404
  }
}

export class Unauthorised extends CustomError {
  constructor(message, details) {
    super(message, details)
    this.name = 'Unauthorised'
    this.status = 401
  }
}

export const checkId = (id) => {
  if (!mongoose.isValidObjectId(id)){
    throw new UnprocessableEntity('Invalid Object Id', { 
      ObjectId: {
        name: 'Failed ObjectId Validation',
        message: 'Invalid Object Id'
      } 
    })
  }
}

export const sendErrors = (error, res) => {

  const { message, name, status, details } = error

  // status = status || 422

  console.log('---------------------------------')
  console.log('Errors:  ')
  console.log('---------------------------------')
  console.log('Name:', status, name)
  console.log('Message:', message)
  console.log('details:', details)
  console.log('---------------------------------')

  console.log(status || 422)

  return res.status(status || 422).json({ errors: details })
}