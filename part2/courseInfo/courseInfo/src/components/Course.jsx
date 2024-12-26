const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}
const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}
const Content = ({parts}) => {  
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </div>
  )
}
const Container = ({parts}) => {
  return (
    <div>
      {parts.map(part => {
        return (
          <div key={part.id}>
            <Header name={part.name}/>
            <Content parts={part.parts}/>
            <Total parts={part.parts}/>
          </div>
        )
      })}
    </div>
  )
}
  
const Total = ({ parts }) => {
  const accumulator = 0
  const result = parts.reduce(
    (accumulator, part) => accumulator += part.exercises,
    accumulator)
  return (
    <div>
      <strong>total of {result} exercises</strong>
    </div>
  )
}
const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name}/>
      <Container parts={course.parts}/>
    </div>
  )
}
  
  export default Course