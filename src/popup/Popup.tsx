import Ripple from '../components/Ripple'

export function Popup() {
  // const [loading, setLoading] = useState(true)

  // if (loading) {
  //   return (
  //     <div className="grid place-items-center min-h-52">
  //       <div className="w-10 h-10 border-4 rounded-full border-foreground/25 animate-spin border-t-primary" />
  //     </div>
  //   )
  // }

  return (
    <main className="relative px-4 py-3 space-y-3">
      <h3 className="text-3xl font-semibold">Website Aura</h3>

      <Ripple className="absolute -top-14 left-[50%] -translate-x-1/2 -z-50 " />
    </main>
  )
}
