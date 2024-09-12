
const InputField = ({...props})=>{
    return (
        <>
            <div className="" >
                 <input className='Input-Field' 
                     type={props.type} 
                     name={props.name} 
                     value={props.value}  
                     id={props.idField}
                     defaultValue={props.defaultValue} 
                     size={props.size}
                     disabled={props.disabled}
                     onChange={props.onChange}
                  />
            </div>
        </>
    )
}
export default InputField;