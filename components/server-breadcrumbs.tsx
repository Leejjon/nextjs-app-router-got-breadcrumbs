'use server';

import {headers} from 'next/headers';
import Link from "next/link";
import {Fragment} from "react";

export default async function ServerBreadcrumbs() {
    const headersList = await headers();
    const path = headersList.get('x-url') || '';
    const pathSegments = path.split('/').filter(segment => segment !== '');
    return (
        <div className="mb-2">
            {path === '/' && <Link href="/" key="breadcrumb0">Home</Link>}
            {pathSegments.map((segment, index) => {
                const renderBreadcrumbSeparation = index > 0 && ' -> ';
                const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
                return (
                    <Fragment key={`breadcrumb${index + 1}`}>
                        {renderBreadcrumbSeparation}
                        <Link href={url}>
                             <span className="capitalize">{segment}</span>
                        </Link>
                    </Fragment>
                );
            })}
        </div>
    );
}
