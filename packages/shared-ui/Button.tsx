
export function Button(props:any){
    console.log("asdfasfd");
    return <button onClick={()=>props.onClick()}>{props.children}</button>
}

export default Button;