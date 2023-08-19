interface IIdeaNoteProps {
}

export default function IdeaNote ({
  
}: IIdeaNoteProps) {
  return (
    <div className="idea-note-1">
      <input type="text" id="ideanote" name="ideanote" placeholder="Write down your ideas here."/>
      <button>Save</button>
    </div>
  )
}
