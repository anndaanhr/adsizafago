import Link from "next/link"
import Image from "next/image"
import { Copy, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function RedeemGuidePage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Help Center", href: "/help" },
          { label: "How to Redeem", href: "/redeem" },
        ]}
      />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">How to Redeem Your Digital Codes</h1>
          <p className="text-muted-foreground">
            Follow these step-by-step guides to redeem your digital codes on various platforms.
          </p>
        </div>

        <Tabs defaultValue="steam" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="steam">Steam</TabsTrigger>
            <TabsTrigger value="epic">Epic Games</TabsTrigger>
            <TabsTrigger value="origin">EA App/Origin</TabsTrigger>
            <TabsTrigger value="ubisoft">Ubisoft Connect</TabsTrigger>
            <TabsTrigger value="other">Other Platforms</TabsTrigger>
          </TabsList>

          <TabsContent value="steam" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4">Redeeming on Steam</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 1: Open Steam</h3>
                        <p className="text-muted-foreground">
                          Launch the Steam client on your computer. If you don't have Steam installed, download it from{" "}
                          <a
                            href="https://store.steampowered.com/about/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            store.steampowered.com
                          </a>
                          .
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 2: Access the Games Menu</h3>
                        <p className="text-muted-foreground">
                          Click on "Games" in the top menu bar of the Steam client.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 3: Activate a Product</h3>
                        <p className="text-muted-foreground">
                          Select "Activate a Product on Steam..." from the dropdown menu.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 4: Accept the Agreement</h3>
                        <p className="text-muted-foreground">
                          Read and accept the Steam Subscriber Agreement by clicking "Next".
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 5: Enter Your Product Code</h3>
                        <p className="text-muted-foreground">
                          Enter the Steam key you purchased from Zafago in the provided field and click "Next".
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 6: Confirmation and Download</h3>
                        <p className="text-muted-foreground">
                          Once your key is verified, the game will be added to your Steam library. You can then download
                          and install it.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild variant="outline" className="flex items-center">
                        <a
                          href="https://help.steampowered.com/en/faqs/view/2A12-9D79-C3D7-F870"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Steam Support Page
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="md:w-1/2">
                    <div className="rounded-lg overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=400&width=600&text=Steam+Redemption+Guide"
                        alt="Steam redemption guide"
                        width={600}
                        height={400}
                        className="w-full"
                      />
                    </div>

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Example Steam Key Format:</h4>
                      <div className="flex items-center justify-between bg-background p-2 rounded border">
                        <code className="text-sm">XXXXX-XXXXX-XXXXX</code>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy format</span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Note: Actual Steam keys contain letters and numbers, not X's.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="epic" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4">Redeeming on Epic Games Store</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 1: Log in to Epic Games</h3>
                        <p className="text-muted-foreground">
                          Open the Epic Games Launcher and log in to your account. If you don't have the Epic Games
                          Launcher, download it from{" "}
                          <a
                            href="https://www.epicgames.com/store/en-US/download"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            epicgames.com
                          </a>
                          .
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 2: Access Your Account</h3>
                        <p className="text-muted-foreground">
                          Click on your username in the bottom-left corner of the launcher to open the account menu.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 3: Redeem Code</h3>
                        <p className="text-muted-foreground">Select "Redeem Code" from the dropdown menu.</p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 4: Enter Your Code</h3>
                        <p className="text-muted-foreground">
                          Enter the Epic Games key you purchased from Zafago in the provided field and click "Redeem".
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 5: Confirmation and Download</h3>
                        <p className="text-muted-foreground">
                          Once your key is verified, the game will be added to your Epic Games library. You can then
                          download and install it.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild variant="outline" className="flex items-center">
                        <a href="https://www.epicgames.com/help/en-US/" target="_blank" rel="noopener noreferrer">
                          Epic Games Support Page
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="md:w-1/2">
                    <div className="rounded-lg overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=400&width=600&text=Epic+Games+Redemption+Guide"
                        alt="Epic Games redemption guide"
                        width={600}
                        height={400}
                        className="w-full"
                      />
                    </div>

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Example Epic Games Key Format:</h4>
                      <div className="flex items-center justify-between bg-background p-2 rounded border">
                        <code className="text-sm">XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</code>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy format</span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Note: Actual Epic Games keys contain letters and numbers, not X's.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="origin" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4">Redeeming on EA App/Origin</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 1: Open EA App</h3>
                        <p className="text-muted-foreground">
                          Launch the EA App on your computer. If you're still using Origin, EA recommends upgrading to
                          the EA App. You can download it from{" "}
                          <a
                            href="https://www.ea.com/ea-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            ea.com/ea-app
                          </a>
                          .
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 2: Access the Menu</h3>
                        <p className="text-muted-foreground">
                          Click on the three horizontal lines in the top-left corner to open the main menu.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 3: Select Help</h3>
                        <p className="text-muted-foreground">Select "Help" from the dropdown menu.</p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 4: Redeem Product Code</h3>
                        <p className="text-muted-foreground">
                          Click on "Redeem Product Code" and enter the EA/Origin key you purchased from Zafago.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 5: Confirmation and Download</h3>
                        <p className="text-muted-foreground">
                          Once your key is verified, the game will be added to your EA library. You can then download
                          and install it.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild variant="outline" className="flex items-center">
                        <a
                          href="https://help.ea.com/en/help/account/origin-login-and-redemption-troubleshooting/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          EA Support Page
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="md:w-1/2">
                    <div className="rounded-lg overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=400&width=600&text=EA+App+Redemption+Guide"
                        alt="EA App redemption guide"
                        width={600}
                        height={400}
                        className="w-full"
                      />
                    </div>

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Example EA/Origin Key Format:</h4>
                      <div className="flex items-center justify-between bg-background p-2 rounded border">
                        <code className="text-sm">XXXX-XXXX-XXXX-XXXX</code>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy format</span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Note: Actual EA/Origin keys contain letters and numbers, not X's.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ubisoft" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4">Redeeming on Ubisoft Connect</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 1: Open Ubisoft Connect</h3>
                        <p className="text-muted-foreground">
                          Launch the Ubisoft Connect client on your computer. If you don't have it installed, download
                          it from{" "}
                          <a
                            href="https://ubisoftconnect.com/en-US/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            ubisoftconnect.com
                          </a>
                          .
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 2: Access the Menu</h3>
                        <p className="text-muted-foreground">
                          Click on the hamburger menu (three horizontal lines) in the top-left corner.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 3: Go to Account Settings</h3>
                        <p className="text-muted-foreground">Select "Account Information" from the dropdown menu.</p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 4: Activate Product</h3>
                        <p className="text-muted-foreground">
                          Click on "Activate Product" and enter the Ubisoft Connect key you purchased from Zafago.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Step 5: Confirmation and Download</h3>
                        <p className="text-muted-foreground">
                          Once your key is verified, the game will be added to your Ubisoft Connect library. You can
                          then download and install it.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild variant="outline" className="flex items-center">
                        <a href="https://www.ubisoft.com/en-us/help" target="_blank" rel="noopener noreferrer">
                          Ubisoft Support Page
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="md:w-1/2">
                    <div className="rounded-lg overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=400&width=600&text=Ubisoft+Connect+Redemption+Guide"
                        alt="Ubisoft Connect redemption guide"
                        width={600}
                        height={400}
                        className="w-full"
                      />
                    </div>

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Example Ubisoft Connect Key Format:</h4>
                      <div className="flex items-center justify-between bg-background p-2 rounded border">
                        <code className="text-sm">XXXX-XXXX-XXXX-XXXX</code>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy format</span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Note: Actual Ubisoft Connect keys contain letters and numbers, not X's.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Other Platforms</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">GOG.com</h3>
                    <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                      <li>
                        Go to{" "}
                        <a
                          href="https://www.gog.com/redeem"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          gog.com/redeem
                        </a>
                      </li>
                      <li>Log in to your GOG account</li>
                      <li>Enter your GOG key in the provided field</li>
                      <li>Click "Redeem"</li>
                    </ol>
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <a
                        href="https://support.gog.com/hc/en-us"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        GOG Support
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Battle.net</h3>
                    <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                      <li>Log in to the Battle.net desktop app</li>
                      <li>Click on your account name in the top-right corner</li>
                      <li>Select "Account Settings"</li>
                      <li>Click on "Redeem a Code"</li>
                      <li>Enter your Battle.net key and click "Redeem"</li>
                    </ol>
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <a
                        href="https://battle.net/support/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Battle.net Support
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Microsoft Store</h3>
                    <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                      <li>
                        Go to{" "}
                        <a
                          href="https://redeem.microsoft.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          redeem.microsoft.com
                        </a>
                      </li>
                      <li>Sign in with your Microsoft account</li>
                      <li>Enter your Microsoft Store key</li>
                      <li>Click "Redeem"</li>
                    </ol>
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <a
                        href="https://support.microsoft.com/en-us/account-billing/redeem-a-gift-card-or-code-to-your-microsoft-account-d6b2c675-9e31-f312-7c15-82917acfd2f2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Microsoft Support
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">PlayStation Store</h3>
                    <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                      <li>Go to PlayStation Store on your console or web browser</li>
                      <li>
                        Select "Redeem Codes" (on console) or click your account icon and select "Redeem Codes" (on web)
                      </li>
                      <li>Enter your PlayStation Store code</li>
                      <li>Click "Redeem"</li>
                    </ol>
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <a
                        href="https://www.playstation.com/en-us/support/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        PlayStation Support
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Need Help with Another Platform?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you need help redeeming a code on a platform not listed here, please contact our customer support
                    team for assistance.
                  </p>
                  <Button asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Tips</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Invalid Code Error</h3>
              <p className="text-muted-foreground">
                Double-check that you're entering the code correctly, including any hyphens. Make sure you're redeeming
                the code on the correct platform.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Code Already Redeemed</h3>
              <p className="text-muted-foreground">
                If you receive an error stating the code has already been redeemed, contact our customer support team
                with your order details.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Region Restrictions</h3>
              <p className="text-muted-foreground">
                Some codes are region-specific. Check the product description to ensure the code is valid in your
                region.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Platform Account Issues</h3>
              <p className="text-muted-foreground">
                Ensure you're logged into the correct account on the platform where you're redeeming the code.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-4">
              Still having trouble redeeming your code? Our customer support team is here to help.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
