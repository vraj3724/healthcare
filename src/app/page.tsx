
import {MetamaskAuthentication} from '@/components/MetamaskAuthentication';
import {RecordView} from '@/components/RecordView';
import {SidebarProvider, Sidebar, SidebarContent} from '@/components/ui/sidebar';
import {Card} from '@/components/ui/card';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent>
            <MetamaskAuthentication />
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-4">
          <Card className="h-full">
            <RecordView />
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
}
